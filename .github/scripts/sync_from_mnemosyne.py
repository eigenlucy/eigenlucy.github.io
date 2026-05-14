#!/usr/bin/env python3
"""Sync a Mnemosyne folder to a Jekyll collection with delete reconciliation.

Calls the locked Mnemosyne contract:

    POST $MNEMOSYNE_URL/generate-markdown/folder
    { "graph_id": ..., "folder_name": ..., "collection": ... }

Response (200 application/json):

    {
      "folder":       { "name": ..., "id": ... },
      "items": [ { "document_id": ..., "filename": ..., "content": ... }, ... ],
      "document_ids": [ "<uuid>", ... ],   # SUCCESSFUL renders only
      "warnings":     [ { "document_id": ..., "reason": ... } ]
    }

Writes each item to `_<collection>/<filename>`. Then scans existing
`_<collection>/*.md` files; any file whose YAML frontmatter carries a
`mnemosyne.document_id` not present in the response's `document_ids` is
deleted via `git rm`. Files lacking a `mnemosyne:` provenance block are
NEVER touched — hand-written moments are sacred.

Modes:

    Live:    reads env (MNEMOSYNE_URL, MNEMOSYNE_API_KEY, GRAPH_ID,
             FOLDER_NAME, COLLECTION), POSTs to the endpoint, writes
             files, runs `git rm` on orphans, prints a summary line.

    Dry-run: --dry-run --response <file.json> --collection <name>
             skips HTTP and `git rm`, prints what *would* change.
             Useful for local testing.

Exits non-zero on HTTP error, malformed JSON, or unexpected I/O failure.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

import yaml


# ---------- HTTP ----------------------------------------------------------- #


def fetch_folder(
    base_url: str,
    api_key: str | None,
    graph_id: str,
    folder_name: str,
    collection: str,
    dev_user_id: str | None = None,
) -> dict[str, Any]:
    """POST to the folder endpoint and return parsed JSON.

    Auth: in normal operation pass ``api_key`` (a ``mnemo_…`` Bearer token).
    For local testing against a Mnemosyne in ``dev_no_auth`` mode, pass
    ``dev_user_id`` instead — it's sent as the ``X-User-ID`` header that the
    platform's dev-mode auth accepts. Exactly one of the two should be set.
    """
    url = f"{base_url.rstrip('/')}/generate-markdown/folder"
    body = json.dumps(
        {"graph_id": graph_id, "folder_name": folder_name, "collection": collection}
    ).encode("utf-8")
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    if api_key:
        headers["Authorization"] = f"Bearer {api_key}"
    elif dev_user_id:
        headers["X-User-ID"] = dev_user_id
    req = urllib.request.Request(url, data=body, method="POST", headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:  # noqa: S310
            raw = resp.read()
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        sys.stderr.write(
            f"Mnemosyne returned HTTP {e.code}\n{err_body}\n"
        )
        sys.exit(1)
    except urllib.error.URLError as e:
        sys.stderr.write(f"Network error reaching {url}: {e}\n")
        sys.exit(1)

    try:
        return json.loads(raw.decode("utf-8"))
    except json.JSONDecodeError as e:
        sys.stderr.write(
            f"Malformed JSON from Mnemosyne: {e}\n--- body ---\n"
            f"{raw.decode('utf-8', errors='replace')}\n"
        )
        sys.exit(1)


# ---------- Frontmatter --------------------------------------------------- #


def extract_mnemosyne_document_id(md_path: Path) -> str | None:
    """Return the `mnemosyne.document_id` from a markdown file's frontmatter,
    or None if the file has no `mnemosyne:` provenance block.

    Returns None on any parse failure — better to leave a file alone than
    risk deleting a hand-written one we couldn't classify.
    """
    try:
        text = md_path.read_text(encoding="utf-8")
    except OSError:
        return None
    if not text.startswith("---"):
        return None
    # Split off the YAML frontmatter between the first pair of `---` fences.
    parts = text.split("\n", 1)
    if len(parts) < 2:
        return None
    rest = parts[1]
    end = rest.find("\n---")
    if end == -1:
        return None
    fm_text = rest[:end]
    try:
        data = yaml.safe_load(fm_text)
    except yaml.YAMLError:
        return None
    if not isinstance(data, dict):
        return None
    mn = data.get("mnemosyne")
    if not isinstance(mn, dict):
        return None
    doc_id = mn.get("document_id")
    if not isinstance(doc_id, str) or not doc_id:
        return None
    return doc_id


# ---------- Sync ---------------------------------------------------------- #


def sync(
    response: dict[str, Any],
    collection: str,
    *,
    dry_run: bool = False,
    repo_root: Path | None = None,
) -> dict[str, Any]:
    """Apply the sync to disk and return a summary dict."""
    root = repo_root or Path.cwd()
    coll_dir = root / f"_{collection}"
    coll_dir.mkdir(parents=True, exist_ok=True)

    items = response.get("items") or []
    document_ids = set(response.get("document_ids") or [])
    warnings = response.get("warnings") or []

    added: list[str] = []
    modified: list[str] = []
    unchanged: list[str] = []
    removed: list[str] = []

    # 1. Write each item.
    for item in items:
        filename = item.get("filename")
        content = item.get("content")
        if not filename or content is None:
            sys.stderr.write(
                f"Skipping item with missing filename/content: {item!r}\n"
            )
            continue
        target = coll_dir / filename
        if target.exists():
            try:
                existing = target.read_text(encoding="utf-8")
            except OSError:
                existing = None
            if existing == content:
                unchanged.append(str(target.relative_to(root)))
                continue
            if not dry_run:
                target.write_text(content, encoding="utf-8")
            modified.append(str(target.relative_to(root)))
        else:
            if not dry_run:
                target.write_text(content, encoding="utf-8")
            added.append(str(target.relative_to(root)))

    # 2. Delete reconciliation.
    for md in sorted(coll_dir.glob("*.md")):
        doc_id = extract_mnemosyne_document_id(md)
        if doc_id is None:
            # No provenance — hand-written. Never delete.
            continue
        if doc_id in document_ids:
            continue
        # Provenance present, doc_id missing from response → orphan, delete.
        rel = str(md.relative_to(root))
        if not dry_run:
            res = subprocess.run(
                ["git", "rm", "--quiet", "--", rel],
                cwd=root,
                capture_output=True,
                text=True,
            )
            if res.returncode != 0:
                # File may not be tracked yet (e.g. just-written in same run);
                # fall back to plain unlink so the workflow still reconciles.
                try:
                    md.unlink()
                except OSError as e:
                    sys.stderr.write(
                        f"Could not remove orphan {rel}: git rm said "
                        f"{res.stderr.strip()!r}, unlink raised {e}\n"
                    )
                    continue
        removed.append(rel)

    return {
        "added": added,
        "modified": modified,
        "unchanged": unchanged,
        "removed": removed,
        "warnings": warnings,
        "collection": collection,
        "folder": response.get("folder"),
    }


# ---------- Reporting ----------------------------------------------------- #


def print_summary(summary: dict[str, Any]) -> None:
    """Human-readable summary to stderr; machine-readable JSON to stdout.

    The workflow captures stdout to drive the commit message.
    """
    n_added = len(summary["added"])
    n_modified = len(summary["modified"])
    n_unchanged = len(summary["unchanged"])
    n_removed = len(summary["removed"])
    n_warnings = len(summary["warnings"])

    sys.stderr.write(
        f"sync: collection={summary['collection']} "
        f"added={n_added} modified={n_modified} "
        f"unchanged={n_unchanged} removed={n_removed} "
        f"warnings={n_warnings}\n"
    )
    for path in summary["added"]:
        sys.stderr.write(f"  + {path}\n")
    for path in summary["modified"]:
        sys.stderr.write(f"  ~ {path}\n")
    for path in summary["removed"]:
        sys.stderr.write(f"  - {path}\n")
    for w in summary["warnings"]:
        sys.stderr.write(
            f"  ! warning document_id={w.get('document_id')} "
            f"reason={w.get('reason')}\n"
        )

    # Stdout: a single line of JSON the workflow can parse.
    out = {
        "collection": summary["collection"],
        "added": n_added,
        "modified": n_modified,
        "unchanged": n_unchanged,
        "removed": n_removed,
        "warnings": n_warnings,
        "warning_details": summary["warnings"],
    }
    sys.stdout.write(json.dumps(out) + "\n")


# ---------- Entry --------------------------------------------------------- #


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Skip HTTP and git operations; just simulate.",
    )
    p.add_argument(
        "--response",
        type=Path,
        help="Path to a JSON file containing a pre-fetched response. "
        "Required with --dry-run; optional otherwise (skips the HTTP call).",
    )
    p.add_argument(
        "--collection",
        help="Jekyll collection name (e.g. 'moments'). "
        "Defaults to $COLLECTION env var.",
    )
    p.add_argument(
        "--graph-id",
        help="Mnemosyne graph_id. Defaults to $GRAPH_ID env var.",
    )
    p.add_argument(
        "--folder-name",
        help="Mnemosyne folder name. Defaults to $FOLDER_NAME env var.",
    )
    p.add_argument(
        "--repo-root",
        type=Path,
        default=Path.cwd(),
        help="Repository root (default: cwd).",
    )
    args = p.parse_args()

    collection = args.collection or os.environ.get("COLLECTION") or "moments"
    graph_id = args.graph_id or os.environ.get("GRAPH_ID") or "lucy"
    folder_name = args.folder_name or os.environ.get("FOLDER_NAME") or collection

    if args.response is not None:
        try:
            response = json.loads(args.response.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as e:
            sys.stderr.write(f"Could not load response file {args.response}: {e}\n")
            return 1
    else:
        if args.dry_run:
            sys.stderr.write("--dry-run requires --response <file.json>\n")
            return 2
        base_url = os.environ.get("MNEMOSYNE_URL")
        api_key = os.environ.get("MNEMOSYNE_API_KEY")
        # Dev escape hatch for testing against a local Mnemosyne in
        # `dev_no_auth` mode — accepts an X-User-ID header instead of a
        # mnemo_ Bearer token. Not used by CI.
        dev_user_id = os.environ.get("MNEMOSYNE_DEV_USER_ID")
        if not base_url or (not api_key and not dev_user_id):
            sys.stderr.write(
                "MNEMOSYNE_URL plus one of MNEMOSYNE_API_KEY / "
                "MNEMOSYNE_DEV_USER_ID must be set in env.\n"
            )
            return 2
        response = fetch_folder(
            base_url,
            api_key,
            graph_id,
            folder_name,
            collection,
            dev_user_id=dev_user_id,
        )

    summary = sync(
        response,
        collection,
        dry_run=args.dry_run,
        repo_root=args.repo_root,
    )
    print_summary(summary)
    return 0


if __name__ == "__main__":
    sys.exit(main())
