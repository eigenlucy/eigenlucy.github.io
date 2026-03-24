---
layout: default
permalink: /library/
title: Library
description: PDFs and references
nav: false
---

<div class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>

  <div class="library">
    {% if site.data.library.size > 0 %}
      <ul class="library-list">
        {% for item in site.data.library %}
          <li>
            {% if item.ext == "pdf" %}
              <a href="{{ '/viewer/?file=' | append: item.path | relative_url }}">{{ item.title }}</a>
            {% else %}
              <a href="{{ item.path | relative_url }}">{{ item.title }}</a>
            {% endif %}
            <span class="library-meta">{{ item.ext | upcase }}, {{ item.size }}</span>
          </li>
        {% endfor %}
      </ul>
    {% else %}
      <p>No files yet. Add PDFs or other documents to <code>assets/library/</code>.</p>
    {% endif %}
  </div>
</div>
