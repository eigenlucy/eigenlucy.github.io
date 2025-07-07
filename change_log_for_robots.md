## 2025-06-18 Goose: Initial Setup and Content Migration

*   **`jekyll_guide_for_robots.md`**:
    *   Created and populated with initial documentation covering Jekyll basics, Arch Linux environment (Ruby, Bundler), local development, GitHub Pages deployment, key al-folio concepts used in the site, and references to other important log files.
*   **`_eigenlucy/` Collection**:
    *   Confirmed `_eigenlucy` collection is defined in `_config.yml` with `output: true`, `layout: post` (default), and `sitemap: false`.
    *   Migrated "Origin is the Goal" from Medium to `_eigenlucy/origin-is-the-goal.md` (actual current name is `2025-01-06-origin.md`).
        *   Fetched content, extracted relevant text.
        *   Added front matter: `layout`, `title`, `author`, `date` (original), `description`, `source_url`, and `tags: [reflection]`.
    *   Migrated "Notes on Cοvιd, Witchcraft, & Stillstellungen" (renamed to "Notes on Stillstellungen" for the site) from Medium to the file now named `_eigenlucy/2025-01-24-stillstellung.md`.
        *   Fetched content, extracted relevant text (translator's note and bullet points).
        *   Added front matter: `layout`, `title` ("Notes on Stillstellungen"), `author`, `date` (original), `description`, `source_url`, and `tags: [philosophy, Walter Benjamin, Stillstellung, critical theory]`.

## 2025-06-19 Goose: Layout Adjustments, File Corrections, and Critical Rules Doc

*   **Stillstellungen Page (`_eigenlucy/2025-01-24-stillstellung.md` formerly `.../2025-01-02-stillstellungen.md`):**
    *   Implemented a side-by-side layout for Klee's Angel image and the Gershom Scholem poem block using HTML with inline Flexbox styling. This was applied to the file originally named `2025-01-02-stillstellungen.md`.
    *   Adjusted the Flexbox `align-items` property from `flex-start` to `center` to vertically center the image and poem relative to each other.
    *   Added `justify-content: center;` to the Flexbox styling to horizontally center the entire image/poem block on the page.
    *   Added `text-align: center;` to the poem's container `div` to center the poem text within its column.
    *   Added `margin-left: auto; margin-right: auto;` to the `<img>` tag's style to center the image within its column.
    *   Attempted to remove a gray box from the Klee's Angel image by adding `border: none; outline: none; text-decoration: none;` to its inline style.
    *   Corrected a date inconsistency: The file `_eigenlucy/2025-01-02-stillstellungen.md` had a front matter date of `2025-01-24`.
    *   Renamed the file to `/home/lucy/eigenlucy.github.io/_eigenlucy/2025-01-24-stillstellungen.md` to align the filename with its front matter date and the content's origin.
    *   Proofread and corrected spelling/grammar in `/home/lucy/eigenlucy.github.io/_eigenlucy/2025-01-24-stillstellung.md`.
*   **`CRITICAL_JEKYLL_RULES.md`**:
    *   Created this new document in the root directory.
    *   Populated with essential, concise rules for Jekyll site maintenance, covering:
        *   Filename conventions for posts/dated collections (e.g., `YYYY-MM-DD-title.md` and matching filename date with front matter date).
        *   Mandatory YAML front matter structure.
        *   Requirement to restart the Jekyll server after `_config.yml` changes.
*   **"Le Fin de Satan" Post (`_eigenlucy/2025-06-18-the-end-of-satan.md`):**
    *   Replaced the Markdown image tag at the top of the post with an HTML `div` and `img` structure.
    *   Applied inline styles to the `img` tag to set its `width` to `50%` (with `height: auto;`) and to center it on the page (`display: block; margin-left: auto; margin-right: auto;`).
*   **`CUSTOMIZE.md` Update:**
    *   Added an introductory note clarifying the document's scope and pointing to other site-specific guides (`jekyll_guide_for_robots.md`, `change_log_for_robots.md`, etc.).
    *   Updated the "Project structure" diagram to include the `_eigenlucy/` collection, more page examples, and the new root-level documentation files.
    *   Added a new section "Site-Specific Documentation & Agent Guides" detailing the purpose of `jekyll_guide_for_robots.md`, `CRITICAL_JEKYLL_RULES.md`, `change_log_for_robots.md`, `robot_reflections.md`, and `goose_prompt.md`.
    *   Added a clarification to the "Adding Collections" section mentioning `_eigenlucy` as an example.
*   **Global Font Changes for Titles, Subheadings, and Links:**
    *   **Objective:** Change non-link titles/subheadings to 'Jacquard 24' and links to 'Jacquard 24 Charted', replacing 'Jacquard 12 Charted'.
    *   **`_includes/head.liquid`**:
        *   Updated Google Fonts `<link>` to import 'Jacquard 24' and 'Jacquard 24 Charted', and removed 'Jacquard 12 Charted'.
    *   **`_sass/_variables.scss`**:
        *   Changed `$heading-font-family` to `'Jacquard 24', cursive;`.
    *   **`_sass/_base.scss`**:
        *   Changed the `.post-title` rule to use `$heading-font-family`.
        *   Confirmed `a` tags use "Jacquard 24 Charted".
*   **Resume Page Font Rendering Fix:**
    *   **Solution:** Added a specific SASS rule to `_sass/_cv.scss` to target item titles (`.cv .card .list-group-item h6.title a`) and set their `font-family` to `$body-font-family`.
*   **Gallery Page (`_pages/gallery.md`) Masonry and Video Layout Fixes:**
    *   **Objective:** Address uneven tiling, slow loading, and card appearance issues.
    *   **HTML Updates (`_pages/gallery.md`):**
        *   Added `grid` class to the main gallery container.
        *   Added `grid-item` class to each gallery card wrapper.
        *   Removed `col-md-3` Bootstrap class from gallery items for better Masonry control.
        *   Wrapped all `{% include video.liquid ... %}` instances with `<div class="video-aspect-ratio-container">...</div>`.
    *   **SASS Updates (`_sass/_gallery.scss` created and imported):**
        *   Defined styles for `.gallery .grid-item` (e.g., `width: 24%;`).
        *   Added CSS rules for `.video-aspect-ratio-container` to enforce a 16:9 aspect ratio.
        *   Refined `.card` styles within the gallery for better flexbox layout.
    *   **JavaScript Update (`assets/js/masonry.js`):**
        *   Modified script to initialize Masonry after `imagesLoaded()` and to explicitly re-layout Masonry on the `loadedmetadata` event for each video, resolving video-related layout issues.
    *   **Outcome:** Successfully resolved card overlapping and improved layout consistency.

## 2025-06-20 Goose: Initial Review and Documentation Check

*   **`CUSTOMIZE.md` Review:**
    *   Identified a minor typo in the project structure diagram: `jekyll_guide_for_robot.md` should be `jekyll_guide_for_robots.md`. The textual descriptions and other references are correct.
*   **`jekyll_guide_for_robots.md` Review:**
    *   Confirmed the guide is comprehensive and up-to-date for Jekyll, Arch Linux environment (RubyGems, Bundler), and GitHub Pages deployment. No immediate updates proposed.
*   **Site Structure Verification:**
    *   Confirmed the main site structure (`_eigenlucy`, `_pages`, `_projects`, etc.) aligns with the descriptions in `CUSTOMIZE.md`.
