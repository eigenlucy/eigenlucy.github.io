# CRITICAL JEKYLL RULES & CONVENTIONS

This document lists absolutely essential rules for this Jekyll site to build and function correctly. No commentary, just rules.

1.  **Post-like Filenames (for `_posts/` and `_eigenlucy/` collections, or any collection intended to be processed with dates):**
    *   Format: `YYYY-MM-DD-title-of-post.md`
    *   Example: `2025-07-15-my-new-musings.md`
    *   The date in the filename **must** match the `date:` field in the file's front matter for consistent behavior.
    *   Failure to follow this for dated collections will likely result in pages not generating correctly or incorrect date associations.

2.  **Front Matter:**
    *   Every page and post (and item in a collection that generates a page) **must** begin with a valid YAML front matter block, enclosed by triple-dashed lines (`---`).
    *   Example:
        ```yaml
        ---
        layout: post
        title: "My Awesome Post"
        date: 2025-07-15 10:00:00 -0000 # Or YYYY-MM-DD
        ---
        ```
    *   Required fields often include `layout`, `title`. For posts/dated items, `date` is critical and should match the filename date.

3.  **`_config.yml` Changes:**
    *   After modifying `_config.yml`, the Jekyll development server (`bundle exec jekyll serve ...`) **must** be stopped (Ctrl+C) and restarted for changes to take effect.

*(More rules can be added here as they are identified as critical)*
