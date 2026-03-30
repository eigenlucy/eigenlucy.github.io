#!/usr/bin/env python3
"""Transform git history into an RDF ontology.

Parses the local git log and produces:
  - Turtle (.ttl) for portable RDF
  - SPARQL INSERT DATA batches for loading into Mnemosyne
  - Markdown summary for human consumption

Zero external dependencies — stdlib only.
"""

import argparse
import os
import re
import subprocess
import sys
from collections import Counter, defaultdict

GIT_NS = "http://eigenlucy.com/git#"
XSD_NS = "http://www.w3.org/2001/XMLSchema#"
RDF_NS = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"

SEP = "\x1f"  # ASCII unit separator — won't appear in commit messages

# ---------------------------------------------------------------------------
# Git parsing
# ---------------------------------------------------------------------------

def run_git_log(repo_dir=None):
    cwd = repo_dir or os.getcwd()
    fmt = SEP.join(["%H", "%h", "%an", "%ae", "%aI", "%P", "%s"])
    result = subprocess.run(
        ["git", "log", "--all", f"--format={fmt}", "--numstat"],
        capture_output=True, text=True, cwd=cwd,
    )
    if result.returncode != 0:
        print(f"git log failed: {result.stderr}", file=sys.stderr)
        sys.exit(1)

    commits = []
    current = None
    for line in result.stdout.split("\n"):
        if SEP in line:
            if current:
                commits.append(current)
            parts = line.split(SEP)
            current = {
                "hash": parts[0],
                "short": parts[1],
                "author": parts[2],
                "email": parts[3],
                "date": parts[4],
                "parents": parts[5].split() if parts[5] else [],
                "message": parts[6],
                "files": [],
            }
        elif line.strip() and current and "\t" in line:
            cols = line.split("\t")
            if len(cols) == 3:
                added, deleted, path = cols
                # Strip quotes from git's escaped-unicode paths
                path = path.strip('"')
                current["files"].append({
                    "path": path,
                    "added": int(added) if added != "-" else 0,
                    "deleted": int(deleted) if deleted != "-" else 0,
                })
    if current:
        commits.append(current)
    return commits


# ---------------------------------------------------------------------------
# Analytics
# ---------------------------------------------------------------------------

def compute_analytics(commits):
    file_commits = defaultdict(int)
    file_adds = defaultdict(int)
    file_dels = defaultdict(int)
    cochange = Counter()
    author_commits = defaultdict(int)
    author_emails = {}
    monthly = Counter()

    for c in commits:
        author_commits[c["author"]] += 1
        author_emails[c["author"]] = c["email"]
        monthly[c["date"][:7]] += 1

        paths = [f["path"] for f in c["files"]]
        for f in c["files"]:
            file_commits[f["path"]] += 1
            file_adds[f["path"]] += f["added"]
            file_dels[f["path"]] += f["deleted"]

        # Co-change: skip bulk commits (>20 files) — they're noise
        if 2 <= len(paths) <= 20:
            for i, a in enumerate(paths):
                for b in paths[i + 1 :]:
                    cochange[tuple(sorted([a, b]))] += 1

    mx = max(file_commits.values()) if file_commits else 1
    hotspots = {f: n / mx for f, n in file_commits.items()}

    return {
        "file_commits": dict(file_commits),
        "file_adds": dict(file_adds),
        "file_dels": dict(file_dels),
        "hotspots": hotspots,
        "cochange": cochange,
        "author_commits": dict(author_commits),
        "author_emails": author_emails,
        "monthly": dict(monthly),
    }


# ---------------------------------------------------------------------------
# RDF helpers
# ---------------------------------------------------------------------------

def esc(s):
    """Escape for Turtle/SPARQL string literal."""
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n").replace("\r", "")


def uri(s):
    """Percent-encode for safe URI local name (prefixed name context)."""
    return re.sub(r"[^a-zA-Z0-9._~-]", lambda m: f"%{ord(m.group()):02X}", s)


def full_uri(kind, s):
    """Return a full <URI> for entities with arbitrary chars (files, commits, authors).

    Uses percent-encoding inside a full IRI, which is universally safe
    across SPARQL parsers (unlike prefixed names with special chars).
    """
    encoded = re.sub(r"[^a-zA-Z0-9._~/-]", lambda m: f"%{ord(m.group()):02X}", s)
    return f"<{GIT_NS}{kind}-{encoded}>"


# ---------------------------------------------------------------------------
# Turtle generation
# ---------------------------------------------------------------------------

def generate_turtle(commits, ana):
    o = []
    o.append(f"@prefix git: <{GIT_NS}> .")
    o.append(f"@prefix xsd: <{XSD_NS}> .")
    o.append(f"@prefix rdf: <{RDF_NS}> .")
    o.append("")

    # --- Authors ---
    for name in sorted(ana["author_emails"]):
        email = ana["author_emails"][name]
        n = ana["author_commits"][name]
        o.append(f'{full_uri("author", name)} a git:Author ;')
        o.append(f'    git:name "{esc(name)}" ;')
        o.append(f'    git:email "{esc(email)}" ;')
        o.append(f'    git:totalCommits {n} .')
        o.append("")

    # --- Files ---
    for path in sorted(ana["file_commits"]):
        cnt = ana["file_commits"][path]
        ext = os.path.splitext(path)[1] or ""
        d = os.path.dirname(path) or "."
        score = ana["hotspots"][path]
        adds = ana["file_adds"].get(path, 0)
        dels = ana["file_dels"].get(path, 0)
        o.append(f'{full_uri("file", path)} a git:File ;')
        o.append(f'    git:path "{esc(path)}" ;')
        o.append(f'    git:extension "{esc(ext)}" ;')
        o.append(f'    git:directory "{esc(d)}" ;')
        o.append(f"    git:totalCommits {cnt} ;")
        o.append(f"    git:totalAdded {adds} ;")
        o.append(f"    git:totalDeleted {dels} ;")
        o.append(f'    git:hotspotScore "{score:.4f}"^^xsd:float .')
        o.append("")

    # --- Co-changes (>= 3 shared commits, top 100) ---
    for (a, b), n in ana["cochange"].most_common(100):
        if n < 3:
            break
        o.append(f'{full_uri("file", a)} git:cochangesWith {full_uri("file", b)} .')

    o.append("")

    # --- Commits ---
    for c in commits:
        o.append(f'{full_uri("commit", c["hash"])} a git:Commit ;')
        o.append(f'    git:hash "{c["hash"]}" ;')
        o.append(f'    git:shortHash "{c["short"]}" ;')
        o.append(f'    git:author {full_uri("author", c["author"])} ;')
        o.append(f'    git:date "{c["date"]}"^^xsd:dateTime ;')
        o.append(f'    git:message "{esc(c["message"])}" ;')
        for p in c["parents"]:
            o.append(f"    git:parentCommit {full_uri('commit', p)} ;")
        for f in c["files"]:
            o.append(f'    git:modifies {full_uri("file", f["path"])} ;')
        # close
        if o[-1].endswith(" ;"):
            o[-1] = o[-1][:-2] + " ."
        o.append("")

    return "\n".join(o)


# ---------------------------------------------------------------------------
# SPARQL generation
# ---------------------------------------------------------------------------

SPARQL_BATCH = 40  # triples per INSERT DATA block


def generate_sparql(commits, ana):
    """Produce batched SPARQL INSERT DATA statements separated by ---."""
    ttl = generate_turtle(commits, ana)

    prefixes = []
    triples = []  # list of "subject blocks" (multi-line turtle stanzas)
    current_block = []

    for line in ttl.split("\n"):
        if line.startswith("@prefix"):
            prefixes.append(line.replace("@prefix", "PREFIX").rstrip(" ."))
        elif line.strip():
            current_block.append(line)
            if line.rstrip().endswith("."):
                triples.append(current_block)
                current_block = []

    if current_block:
        triples.append(current_block)

    prefix_str = "\n".join(prefixes)
    batches = []
    for i in range(0, len(triples), SPARQL_BATCH):
        chunk = triples[i : i + SPARQL_BATCH]
        body = "\n".join("  " + l for block in chunk for l in block)
        batches.append(f"{prefix_str}\nINSERT DATA {{\n{body}\n}}")

    return "\n---\n".join(batches)


# ---------------------------------------------------------------------------
# Markdown summary
# ---------------------------------------------------------------------------

def generate_summary(commits, ana):
    o = []
    o.append("# Git History — Ontology Summary")
    o.append("")
    o.append(f"**Commits:** {len(commits)}  ")
    o.append(f"**Files tracked:** {len(ana['file_commits'])}  ")
    o.append(f"**Contributors:** {len(ana['author_commits'])}")
    if commits:
        o.append(f"**Range:** {commits[-1]['date'][:10]} to {commits[0]['date'][:10]}")
    o.append("")

    # Contributors
    o.append("## Contributors")
    for name, n in sorted(ana["author_commits"].items(), key=lambda x: -x[1]):
        o.append(f"- **{name}** <{ana['author_emails'][name]}> — {n} commits")
    o.append("")

    # Hotspots
    o.append("## File Hotspots")
    o.append("Most frequently modified files:")
    o.append("")
    ranked = sorted(ana["file_commits"].items(), key=lambda x: -x[1])[:25]
    for path, n in ranked:
        score = ana["hotspots"][path]
        o.append(f"- `{path}` — {n} commits (heat {score:.2f})")
    o.append("")

    # Co-change
    top_pairs = ana["cochange"].most_common(20)
    if top_pairs and top_pairs[0][1] >= 2:
        o.append("## Co-change Coupling")
        o.append("Files that change together (shared commits):")
        o.append("")
        for (a, b), n in top_pairs:
            if n < 2:
                break
            o.append(f"- `{a}` ↔ `{b}` — {n}x")
        o.append("")

    # Timeline
    o.append("## Monthly Timeline")
    for month in sorted(ana["monthly"]):
        n = ana["monthly"][month]
        bar = "█" * min(n, 50)
        o.append(f"- `{month}` {bar} {n}")
    o.append("")

    # Directory activity
    dir_n = defaultdict(int)
    for path, n in ana["file_commits"].items():
        top = path.split("/")[0] if "/" in path else "."
        dir_n[top] += n
    o.append("## Activity by Top-Level Directory")
    for d, n in sorted(dir_n.items(), key=lambda x: -x[1])[:15]:
        o.append(f"- `{d}/` — {n} file-commits")
    o.append("")

    # Recent commits
    o.append("## Recent Commits (last 20)")
    for c in commits[:20]:
        o.append(f"- **{c['short']}** {c['date'][:10]} — {c['message']}")

    return "\n".join(o)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Transform git history into RDF ontology"
    )
    parser.add_argument(
        "--format",
        choices=["turtle", "sparql", "summary"],
        default="summary",
        help="Output format (default: summary)",
    )
    parser.add_argument("--output", "-o", help="Write to file instead of stdout")
    parser.add_argument("--repo", help="Path to git repo (default: cwd)")
    args = parser.parse_args()

    commits = run_git_log(args.repo)
    if not commits:
        print("No commits found.", file=sys.stderr)
        sys.exit(1)

    ana = compute_analytics(commits)

    if args.format == "turtle":
        out = generate_turtle(commits, ana)
    elif args.format == "sparql":
        out = generate_sparql(commits, ana)
    else:
        out = generate_summary(commits, ana)

    if args.output:
        with open(args.output, "w") as f:
            f.write(out)
        print(f"Wrote {len(out)} bytes → {args.output}", file=sys.stderr)
    else:
        print(out)


if __name__ == "__main__":
    main()
