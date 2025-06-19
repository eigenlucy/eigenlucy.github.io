## 2025-06-18 Goose: Initial Setup and Content Migration

*   **`jekyll_guide_for_robots.md`**:
    *   Created and populated with initial documentation covering Jekyll basics, Arch Linux environment (Ruby, Bundler), local development, GitHub Pages deployment, key al-folio concepts used in the site, and references to other important log files.
*   **`_eigenlucy/` Collection**:
    *   Confirmed `_eigenlucy` collection is defined in `_config.yml` with `output: true`, `layout: post` (default), and `sitemap: false`.
    *   Migrated "Origin is the Goal" from Medium to `_eigenlucy/origin-is-the-goal.md` (later renamed to `2025-01-06-origin.md` - this needs verification based on current `ls` output).
        *   Fetched content, extracted relevant text.
        *   Added front matter: `layout`, `title`, `author`, `date` (original), `description`, `source_url`, and `tags: [reflection]`.
    *   Migrated "Notes on Cοvιd, Witchcraft, & Stillstellungen" (renamed to "Notes on Stillstellungen" for the site) from Medium to the file now named `_eigenlucy/2025-01-24-stillstellungen.md`.
        *   Fetched content, extracted relevant text (translator's note and bullet points).
        *   Added front matter: `layout`, `title` ("Notes on Stillstellungen"), `author`, `date` (original), `description`, `source_url`, and `tags: [philosophy, Walter Benjamin, Stillstellung, critical theory]`.

## 2025-06-19 Goose: Layout Adjustments, File Corrections, and Critical Rules Doc

*   **Stillstellungen Page (`_eigenlucy/2025-01-24-stillstellungen.md` formerly `.../2025-01-02-stillstellungen.md`):**
    *   Implemented a side-by-side layout for Klee's Angel image and the Gershom Scholem poem block using HTML with inline Flexbox styling. This was applied to the file originally named `2025-01-02-stillstellungen.md`.
    *   Corrected a date inconsistency: The file `_eigenlucy/2025-01-02-stillstellungen.md` had a front matter date of `2025-01-24`.
    *   Renamed the file to `/home/lucy/eigenlucy.github.io/_eigenlucy/2025-01-24-stillstellungen.md` to align the filename with its front matter date and the content's origin.
*   **`CRITICAL_JEKYLL_RULES.md`**:
    *   Created this new document in the root directory.
    *   Populated with essential, concise rules for Jekyll site maintenance, covering:
        *   Filename conventions for posts/dated collections (e.g., `YYYY-MM-DD-title.md` and matching filename date with front matter date).
        *   Mandatory YAML front matter structure.
        *   Requirement to restart the Jekyll server after `_config.yml` changes.
