# Customize

> **Note from Lucy & Goose (AI Assistant):** This `CUSTOMIZE.md` file originates from the al-folio theme and provides excellent general guidance. However, this website has been significantly customized. For a more comprehensive understanding of this specific site's setup, custom structures (like the `_eigenlucy` collection), and ongoing development notes, please **also consult** the following documents in the root directory:
> *   `jekyll_guide_for_robots.md` (Primary technical guide for this site)
> *   `change_log_for_robots.md` (Log of changes)
> *   `CRITICAL_JEKYLL_RULES.md` (Essential quick-reference rules)
> *   `robot_reflections.md` (Aesthetic and improvement ideas)

Here we will give you some tips on how to customize the website. One important thing to note is that **ALL** the changes you make should be done on the **main** branch of your repository. The `gh-pages` branch is automatically overwritten every time you make a change to the main branch.

## Project structure

The project is structured as follows, focusing on the main components that you will need to modify:

```txt
.
├── 📂 assets/: contains the assets that are displayed in the website (images, CSS, JS, PDFs, etc.)
│   └── 📂 json/
    │   └── 📄 resume.json: CV in JSON format (https://jsonresume.org/)
├── 📂 _bibliography/
│   └── 📄 papers.bib: bibliography in BibTeX format
├── 📄 _config.yml: the main Jekyll configuration file for the site.
├── 📂 _data/: contains data files (YAML, JSON, CSV) used by the site.
│   ├── 📄 cv.yml: CV in YAML format, used as a fallback.
│   └── 📄 repositories.yml: Users and repositories info.
├── 📂 _eigenlucy/: Custom collection for specific themed blog posts (e.g., "Origin is the Goal", "Notes on Stillstellung").
├── 📂 _includes/: Reusable HTML snippets included in layouts/pages.
│   └── 📄 news.liquid: Defines the news section layout.
├── 📂 _layouts/: HTML templates defining the structure for different page types.
├── 📂 _news/: Markdown files for news items.
├── 📂 _pages/: Markdown files for standalone pages.
│   ├── 📄 404.md: Page not found.
│   ├── 📄 about.md: Main about page.
│   ├── 📄 blog.md: Blog listing page.
│   ├── 📄 eigenlucy_hub.md: Hub/landing for '_eigenlucy' content.
│   └── 📄 ... (other custom pages like gallery.md, homelab.md, etc.)
├── 📂 _posts/: Main blog posts (follow YYYY-MM-DD-title.md format).
├── 📂 _projects/: Markdown files for project pages.
├── 📂 _sass/: SASS files defining the website's styles and themes.
│   ├── 📄 _base.scss: Base style of the website.
│   ├── 📄 _themes.scss: Theme colors and specific icon styles.
│   └── 📄 _variables.scss: SASS variables.
├── 📄 change_log_for_robots.md: Log of substantial site changes and issues.
├── 📄 CRITICAL_JEKYLL_RULES.md: Essential Jekyll rules for this site.
├── 📄 CUSTOMIZE.md: This guide.
├── 📄 FAQ.md: Frequently Asked Questions about the theme.
├── 📄 Gemfile: Lists Ruby gem dependencies for Bundler.
├── 📄 INSTALL.md: Original theme installation instructions.
├── 📄 jekyll_guide_for_robots.md: Comprehensive site-specific technical guide.
├── 📄 robot_reflections.md: Notes on site aesthetics and improvement ideas.
└── 📄 ... (other configuration files like .gitignore, Dockerfiles, etc.)
```

## Site-Specific Documentation & Agent Guides

In addition to this `CUSTOMIZE.md` guide (which originates from the al-folio theme), several other Markdown files in the root directory have been created to aid in the ongoing development and maintenance of this heavily customized site:

*   **`jekyll_guide_for_robots.md`**: This is a comprehensive technical guide tailored to this specific website. It covers Jekyll fundamentals, the Arch Linux development environment, Bundler usage, local development commands, GitHub Pages deployment details, key al-folio concepts leveraged, and specific configurations for this site. *This should be a primary reference for future agents.*
*   **`CRITICAL_JEKYLL_RULES.md`**: A minimal, very concise document listing absolutely essential rules and conventions (like filename formats) that must be followed for the site to build and function correctly. No extra commentary, just critical rules.
*   **`change_log_for_robots.md`**: A chronological log summarizing substantial changes, updates made to the site, significant errors encountered, and their resolutions. Useful for tracking the evolution of the site and understanding past work.
*   **`robot_reflections.md`**: A repository for broader thoughts, discussions, and reflections regarding the site's aesthetic (medieval-cyberpunk retro-futurism), potential areas for improvement, user experience considerations, and thematic consistency.
*   **`goose_prompt.md`**: The initial prompt and operational guidelines provided for the Goose AI assistant working on this site.

## Configuration

The configuration file [\_config.yml](_config.yml) contains the main configuration of the website. Most of the settings is self-explanatory and we also tried to add as much comments as possible. If you have any questions, please check if it was not already answered in the [FAQ](FAQ.md).

> Note that the `url` and `baseurl` settings are used to generate the links of the website, as explained in the [install instructions](INSTALL.md).

All changes made to this file are only visible after you rebuild the website. That means that you need to run `bundle exec jekyll serve --lsi` again if you are running the website locally or push your changes to GitHub if you are using GitHub Pages. All other changes are visible immediately, you only need to refresh the page.

## Modifying the CV information

There are currently 2 different ways of generating the CV page content. The first one is by using a json file located in [assets/json/resume.json](assets/json/resume.json). It is a [known standard](https://jsonresume.org/) for creating a CV programmatically. The second one, currently used as a fallback when the json file is not found, is by using a yml file located in [\_data/cv.yml](_data/cv.yml). This was the original way of creating the CV page content and since it is more human readable than a json file we decided to keep it as an option.

What this means is, if there is no resume data defined in [\_config.yml](_config.yml) and loaded via a json file, it will load the contents of [\_data/cv.yml](_data/cv.yml). If you want to use the [\_data/cv.yml](_data/cv.yml) file as the source of your CV, you must delete the [assets/json/resume.json](assets/json/resume.json) file.

## Modifying the user and repository information

The user and repository information is defined in [\_data/repositories.yml](_data/repositories.yml). You can add as many users and repositories as you want. Both informations are used in the `repositories` section.

## Creating new pages

You can create new pages by adding new Markdown files in the [\_pages](_pages/) directory. The easiest way to do this is to copy an existing page and modify it. You can choose the layout of the page by changing the [layout](https://jekyllrb.com/docs/layouts/) attribute in the [frontmatter](https://jekyllrb.com/docs/front-matter/) of the Markdown file, and also the path to access it by changing the [permalink](https://jekyllrb.com/docs/permalinks/) attribute. You can also add new layouts in the [\_layouts](_layouts/) directory if you feel the need for it.

## Creating new blog posts

To create a new blog post, you can add a new Markdown file in the [\_posts](_posts/) directory. The [name of the file must follow](https://jekyllrb.com/docs/posts/#creating-posts) the format `YYYY-MM-DD-title.md`. The easiest way to do this is to copy an existing blog post and modify it. Note that some blog posts have optional fields in the [frontmatter](https://jekyllrb.com/docs/front-matter/) that are used to enable specific behaviors or functions.

If you want to create blog posts that are not ready to be published, but you want to track it with git, you can create a [\_drafts](https://jekyllrb.com/docs/posts/#drafts) directory and store them there.

## Creating new projects

You can create new projects by adding new Markdown files in the [\_projects](_projects/) directory. The easiest way to do this is to copy an existing project and modify it.

## Adding some news

You can add news in the about page by adding new Markdown files in the [\_news](_news/) directory. There are currently two types of news: inline news and news with a link. News with a link take you to a new page while inline news are displayed directly in the about page. The easiest way to create yours is to copy an existing news and modify it.

## Adding Collections

This Jekyll theme implements `collections` to let you break up your work into categories. The theme comes with two default collections: `news` and `projects`. Items from the `news` collection are automatically displayed on the home page. Items from the `projects` collection are displayed on a responsive grid on projects page.

You can easily create your own collections, apps, short stories, courses, or whatever your creative work is. To do this, edit the collections in the [\_config.yml](_config.yml) file, create a corresponding folder, and create a landing page for your collection, similar to [\_pages/projects.md](_pages/projects.md). For example, this site includes a custom `_eigenlucy` collection for specific themed posts, defined in `_config.yml` and with its content in the `/_eigenlucy/` folder. A corresponding page `_pages/eigenlucy_hub.md` might serve as its landing page.

## Adding a new publication

To add publications create a new entry in the [\_bibliography/papers.bib](_bibliography/papers.bib) file. You can find the BibTeX entry of a publication in Google Scholar by clicking on the quotation marks below the publication title, then clicking on "BibTeX", or also in the conference page itself. By default, the publications will be sorted by year and the most recent will be displayed first. You can change this behavior and more in the `Jekyll Scholar` section in [\_config.yml](_config.yml) file.

You can add extra information to a publication, like a PDF file in the `assets/pdfs/` directory and add the path to the PDF file in the BibTeX entry with the `pdf` field. Some of the supported fields are: `abstract`, `altmetric`, `arxiv`, `bibtex_show`, `blog`, `code`, `dimensions`, `doi`, `eprint`, `html`, `isbn`, `pdf`, `pmid`, `poster`, `slides`, `supp`, `video`, and `website`.

### Author annotation

In publications, the author entry for yourself is identified by string array `scholar:last_name` and string array `scholar:first_name` in [\_config.yml](_config.yml). For example, if you have the following entry in your [\_config.yml](_config.yml):

```yaml
scholar:
  last_name: [Einstein]
  first_name: [Albert, A.]
```

If the entry matches one form of the last names and the first names, it will be underlined. Keep meta-information about your co-authors in [\_data/coauthors.yml](_data/coauthors.yml) and Jekyll will insert links to their webpages automatically. The co-author data format is as follows,

```yaml
"adams":
  - firstname: ["Edwin", "E.", "E. P.", "Edwin Plimpton"]
    url: https://en.wikipedia.org/wiki/Edwin_Plimpton_Adams

"podolsky":
  - firstname: ["Boris", "B.", "B. Y.", "Boris Yakovlevich"]
    url: https://en.wikipedia.org/wiki/Boris_Podolsky

"rosen":
  - firstname: ["Nathan", "N."]
    url: https://en.wikipedia.org/wiki/Nathan_Rosen

"bach":
  - firstname: ["Johann Sebastian", "J. S."]
    url: https://en.wikipedia.org/wiki/Johann_Sebastian_Bach

  - firstname: ["Carl Philipp Emanuel", "C. P. E."]
    url: https://en.wikipedia.org/wiki/Carl_Philipp_Emanuel_Bach
```

If the entry matches one of the combinations of the last names and the first names, it will be highlighted and linked to the url provided.

### Buttons (through custom bibtex keywords)

There are several custom bibtex keywords that you can use to affect how the entries are displayed on the webpage:

- `abbr`: Adds an abbreviation to the left of the entry. You can add links to these by creating a venue.yaml-file in the \_data folder and adding entries that match.
- `abstract`: Adds an "Abs" button that expands a hidden text field when clicked to show the abstract text
- `altmetric`: Adds an [Altmetric](https://www.altmetric.com/) badge (Note: if DOI is provided just use `true`, otherwise only add the altmetric identifier here - the link is generated automatically)
- `arxiv`: Adds a link to the Arxiv website (Note: only add the arxiv identifier here - the link is generated automatically)
- `bibtex_show`: Adds a "Bib" button that expands a hidden text field with the full bibliography entry
- `blog`: Adds a "Blog" button redirecting to the specified link
- `code`: Adds a "Code" button redirecting to the specified link
- `dimensions`: Adds a [Dimensions](https://www.dimensions.ai/) badge (Note: if DOI or PMID is provided just use `true`, otherwise only add the Dimensions' identifier here - the link is generated automatically)
- `html`: Inserts an "HTML" button redirecting to the user-specified link
- `pdf`: Adds a "PDF" button redirecting to a specified file (if a full link is not specified, the file will be assumed to be placed in the /assets/pdf/ directory)
- `poster`: Adds a "Poster" button redirecting to a specified file (if a full link is not specified, the file will be assumed to be placed in the /assets/pdf/ directory)
- `slides`: Adds a "Slides" button redirecting to a specified file (if a full link is not specified, the file will be assumed to be placed in the /assets/pdf/ directory)
- `supp`: Adds a "Supp" button to a specified file (if a full link is not specified, the file will be assumed to be placed in the /assets/pdf/ directory)
- `website`: Adds a "Website" button redirecting to the specified link

You can implement your own buttons by editing the [\_layouts/bib.liquid](_layouts/bib.liquid) file.

## Changing theme color

A variety of beautiful theme colors have been selected for you to choose from. The default is purple, but you can quickly change it by editing the `--global-theme-color` variable in the [\_sass/\_themes.scss](_sass/_themes.scss) file. Other color variables are listed there as well. The stock theme color options available can be found at [\_sass/\_variables.scss](_sass/_variables.scss). You can also add your own colors to this file assigning each a name for ease of use across the template.

## Adding social media information

You can add your social media links by adding the specified information at the `Social integration` section in the [\_config.yml](_config.yml) file. This information will appear at the bottom of the `About` page.
