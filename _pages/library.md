---
layout: default
permalink: /library/
title: Library
description: PDFs and references
nav: false
sitemap: false
noindex: true
---
<meta name="robots" content="noindex, nofollow">

<div class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>

  <p>These are the books and essays which have most impacted my intellectual development. They are included here for cross-referencing in my writing.</p>

  <div class="library">
    {% if site.data.library.size > 0 %}
      <ul class="library-list">
        {% for item in site.data.library %}
          <li>
            {% assign title_parts = item.title | split: " — " %}
            {% if title_parts.size > 1 %}
              {% if item.ext == "pdf" %}
                <a href="{{ '/viewer/?file=' | append: item.path | relative_url }}">{{ title_parts[0] }}</a> — {{ title_parts[1] }}
              {% else %}
                <a href="{{ item.path | relative_url }}">{{ title_parts[0] }}</a> — {{ title_parts[1] }}
              {% endif %}
            {% else %}
              {% if item.ext == "pdf" %}
                <a href="{{ '/viewer/?file=' | append: item.path | relative_url }}">{{ item.title }}</a>
              {% else %}
                <a href="{{ item.path | relative_url }}">{{ item.title }}</a>
              {% endif %}
            {% endif %}
            <span class="library-meta">{{ item.ext | upcase }}, {{ item.size }}</span>
          </li>
        {% endfor %}
      </ul>
    {% else %}
      <p>No files yet. Add PDFs or other documents to <code>assets/library/</code>.</p>
    {% endif %}
  </div>

  <p class="library-notice"><em>Any content will be removed upon request. Contact <a href="mailto:lucy@sophia-labs.com">lucy@sophia-labs.com</a>.</em></p>
</div>
