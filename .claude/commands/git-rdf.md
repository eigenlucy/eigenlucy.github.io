# /git-rdf — Load Git History Ontology into Mnemosyne

Run the git-rdf script to extract this repo's git history as an RDF ontology, then load it into the user's active Mnemosyne graph.

## Workflow

### 1. Generate the data

Run from the repo root:

```bash
python3 _scripts/git-rdf.py --format sparql
python3 _scripts/git-rdf.py --format summary
```

Capture both outputs.

### 2. Get the user's active graph

Call `mcp__mnemosyne__get_user_location` to find the current `graph_id`.

### 3. Load the RDF triples

The SPARQL output contains multiple `INSERT DATA` blocks separated by `---` lines. Split on `---` and feed each batch to `mcp__mnemosyne__sparql_update` with the graph_id from step 2.

If a batch fails, log the error and continue with remaining batches — partial loads are fine.

### 4. Create the summary document

Use `mcp__mnemosyne__search_documents` to check if a document titled "Git History" already exists. If it does, update it with `mcp__mnemosyne__write_document`. If not, pick a sensible document ID like `git-history` and write the summary markdown to it.

Optionally move it into a "Dev Sessions" or "Architecture" folder if one exists.

### 5. Surface the result

Call `mcp__mnemosyne__surface` with the summary document to give the user a clickable link.

Report:
- How many SPARQL batches were loaded (and any failures)
- Total triple count estimate (batches × ~40 triples each)
- Link to the summary document

## Arguments

- `--full` (default): Load both RDF triples and summary document
- `--summary-only`: Only create/update the summary document (skip SPARQL)
- `--dry-run`: Print what would be loaded without writing anything

If the user passes arguments after `/git-rdf`, interpret them as above.
