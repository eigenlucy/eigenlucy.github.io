---
layout: page
permalink: /publications/
title: gallery
description: an assortment of projects photos 
nav: true
nav_order: 2
display_categories: [electrical engineering]
---

<!-- _pages/publications.md -->
<div class="publications">
{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}


</div>
