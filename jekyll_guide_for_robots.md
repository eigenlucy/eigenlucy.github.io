# Jekyll Guide for Future Robots (and Humans!)

This guide provides essential information for maintaining and developing this Jekyll-based website.

## 1. Core Technology: Jekyll

Jekyll is a static site generator. It takes your content (written in Markdown), applies layouts and includes (using the Liquid templating engine), and generates a complete, static website (HTML, CSS, JS) that can be served by almost any web server.

**Key Concepts:**
*   **`_config.yml`**: The main configuration file for your Jekyll site. Contains site-wide settings, theme information, plugin configurations, and more.
*   **Content:**
    *   **`_posts/`**: Blog posts. Filenames must follow `YYYY-MM-DD-title.md`.
    *   **`_pages/`**: Static pages (e.g., About, Contact).
    *   **Collections (e.g., `_projects/`, `_news/`, `_eigenlucy/`)**: Custom content types. Each collection is a folder prefixed with an underscore and defined in `_config.yml`. They allow grouping similar content (like projects or specialized blog posts).
*   **Structure & Templating:**
    *   **`_layouts/`**: Defines the basic HTML structure for different types of pages (e.g., `default.html`, `post.html`).
    *   **`_includes/`**: Reusable snippets of HTML/Liquid code that can be included in layouts and pages.
    *   **Front Matter**: YAML block at the very beginning of Markdown files (between triple-dashed lines `---`) that defines metadata like `layout`, `title`, `date`, `permalink`, and custom variables.
*   **Styling:**
    *   **`_sass/`**: Contains SASS (Syntactically Awesome Stylesheets) files. SASS is a CSS preprocessor that adds features like variables, nesting, and mixins. These files are compiled into standard CSS. For this al-folio based theme, `_themes.scss` and `_variables.scss` are particularly important for aesthetic customization.
*   **Assets (`assets/`)**: Static files like images, PDFs, and global CSS/JS files.

**Official Documentation:** <https://jekyllrb.com/docs/>

## 2. Environment & Dependencies (Arch Linux Focus)

This site is developed on EndeavourOS/Arch Linux.

*   **Ruby:** Jekyll is built with Ruby.
    *   Installation: `sudo pacman -S ruby`
*   **RubyGems:** The package manager for Ruby. Used to install Jekyll and its plugins (which are called "gems").
    *   Usually installed with Ruby. `gem --version` to check.
*   **Bundler:** Manages Ruby gem dependencies for the project, ensuring consistency.
    *   Installation: `sudo pacman -S ruby-bundler` (or `gem install bundler`)
    *   **`Gemfile`**: Lists all direct gem dependencies for the project.
    *   **`Gemfile.lock`**: Records the exact versions of all gems (direct and indirect) that were last successfully used. **Commit this file to your repository.**
    *   **Workflow:**
        *   `bundle install`: Installs all gems specified in `Gemfile` (and `Gemfile.lock` if present). Run this after cloning the repo or when `Gemfile` changes.
        *   `bundle exec <command>`: **Crucial!** Always prefix Jekyll commands (and other gem commands like `rake`) with `bundle exec`. This ensures you are using the gem versions defined in your project's `Gemfile.lock`, not system-wide gems.
        *   `bundle update <gemname>`: Updates a specific gem and its dependencies.
        *   `bundle update`: Updates all gems according to `Gemfile`. Use with caution, test thoroughly after.

## 3. Local Development

To view the site locally:

1.  Navigate to the project directory: `cd /home/lucy/eigenlucy.github.io`
2.  Run the Jekyll development server:
    ```bash
    bundle exec jekyll serve --livereload --port 4002
    ```
    *   `--livereload`: Automatically refreshes the browser when you save changes to files.
    *   `--port 4002`: Specifies the port to run the server on.
3.  Open your browser to <http://localhost:4002>.

To build the site (generates static files into `_site/`):
```bash
bundle exec jekyll build
```

## 4. Deployment: GitHub Pages

This site is deployed using GitHub Pages.

*   **How it Works:** GitHub Pages can automatically build and serve Jekyll sites. Typically, you push your source code (including `_config.yml`, Markdown files, `Gemfile`, etc.) to a specific branch (e.g., `main` or `master`), and GitHub Actions (or an older internal system) builds the Jekyll site and deploys it.
*   **`_config.yml` settings for GitHub Pages:**
    *   `url`: The main URL of your site (e.g., `https://username.github.io`).
    *   `baseurl`: If your site is served from a subdirectory (e.g., `https://username.github.io/repository-name`), this should be set to `/repository-name`. If served from the root of the domain, it's often an empty string `""` or `/`. Check your site's specific configuration.
*   **Plugin Compatibility:** GitHub Pages has a list of [supported Jekyll plugins](https://pages.github.com/versions/). If you use plugins not on this list, you might need to build the site locally and push the static `_site/` content, or use a custom GitHub Actions workflow to build the site with your specific gems.
*   **Build Logs:** If deployment fails, check the build logs in the "Actions" tab of your GitHub repository.

**Official Documentation:** <https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll>

## 5. Key al-folio Theme Concepts Used

This site is based on the al-folio theme, which has several conventions:

*   **Collections for Content:**
    *   `_projects/`: For project pages.
    *   `_news/`: For news items, often displayed on the homepage.
    *   `_eigenlucy/`: Custom collection for specific blog posts not on the main page. *Ensure this is correctly configured in `_config.yml` if you want Jekyll to process it as a collection with its own permalinks, layouts, etc.*
*   **Data Files (`_data/`):**
    *   YAML files like `cv.yml` (CV data) and `repositories.yml` (GitHub repo info) can be used to store structured data that is then pulled into pages/layouts.
*   **Bibliography (`_bibliography/papers.bib`):**
    *   Uses `jekyll-scholar` plugin to process BibTeX files and display publications.
*   **SASS Customization (`_sass/`):**
    *   Theme colors, fonts, and layout styles are managed here. `_themes.scss` and `_variables.scss` are key for visual customization.

## 6. Important Site-Specific Logs

*   **`change_log_for_robots.md`**: Summarizes substantial changes, updates, and errors encountered during site development.
*   **`robot_reflections.md`**: Contains broader reflections on site aesthetics, potential improvements, and thematic consistency.
*   **`CUSTOMIZE.md`**: Original (now partially outdated) guide for customizing the al-folio theme. Still a useful reference for theme basics.

---
*This guide is a living document. Please update it with any new, relevant information as you work on the site.*
