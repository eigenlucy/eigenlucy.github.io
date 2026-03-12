---
layout: default
permalink: /gallery/
title: gallery
description: some of my projects from the last few years
nav: true
nav_order: 1
---

<div class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>

  <div class="tag-filter-container">
      <!-- Default tags -->
      <div class="default-tags">
        <button class="tag-filter" data-tag="featured"><i class="fa-solid fa-hashtag"></i> Featured</button>
        <button class="tag-filter" data-tag="all"><i class="fa-solid fa-hashtag"></i> All</button>
        <button class="tag-filter" data-tag="image"><i class="fa-solid fa-hashtag"></i> Image</button>
        <button class="tag-filter" data-tag="video"><i class="fa-solid fa-hashtag"></i> Video</button>
        <button class="tag-filter" data-tag="electrical engineering"><i class="fa-solid fa-hashtag"></i> Electrical Engineering</button>
        <button class="tag-filter" data-tag="chemistry"><i class="fa-solid fa-hashtag"></i> Chemistry</button>
        <button class="tag-filter" data-tag="mycology"><i class="fa-solid fa-hashtag"></i> Mycology</button>
        <button class="tag-filter" data-tag="hv"><i class="fa-solid fa-hashtag"></i> High Voltage</button>
        <button class="tag-filter" data-tag="3d printing"><i class="fa-solid fa-hashtag"></i> 3D Printing</button>
        <button class="tag-filter" data-tag="biohacking"><i class="fa-solid fa-hashtag"></i> Biohacking</button>
        <button class="tag-filter" data-tag="pcb design"><i class="fa-solid fa-hashtag"></i> PCB Design</button>
      </div>
      <!-- Extra tags, hidden by default -->
      <div class="extra-tags" style="display: none;">
        <button class="tag-filter" data-tag="electronics"><i class="fa-solid fa-hashtag"></i> Electronics</button>
        <button class="tag-filter" data-tag="biology"><i class="fa-solid fa-hashtag"></i> Biology</button>
        <button class="tag-filter" data-tag="cnc"><i class="fa-solid fa-hashtag"></i> CNC</button>
        <button class="tag-filter" data-tag="laser"><i class="fa-solid fa-hashtag"></i> Laser</button>
        <button class="tag-filter" data-tag="implants"><i class="fa-solid fa-hashtag"></i> Implants</button>
        <button class="tag-filter" data-tag="nfc"><i class="fa-solid fa-hashtag"></i> NFC</button>
        <button class="tag-filter" data-tag="attiny"><i class="fa-solid fa-hashtag"></i> ATTiny</button>
        <button class="tag-filter" data-tag="samd21"><i class="fa-solid fa-hashtag"></i> SAMD21</button>
        <button class="tag-filter" data-tag="fusion360"><i class="fa-solid fa-hashtag"></i> Fusion360</button>
        <button class="tag-filter" data-tag="supercaps"><i class="fa-solid fa-hashtag"></i> Supercaps</button>
        <button class="tag-filter" data-tag="thermal cam"><i class="fa-solid fa-hashtag"></i> Thermal Cam</button>
        <button class="tag-filter" data-tag="terrarium"><i class="fa-solid fa-hashtag"></i> Terrarium</button>
        <button class="tag-filter" data-tag="distillation"><i class="fa-solid fa-hashtag"></i> Distillation</button>
      </div>
  </div>
</div>

<!-- Gallery cards generated from _data/gallery.yml -->
<div class="gallery">
  <div class="container">
    <div class="row cards-container">
      {% for item in site.data.gallery %}
        {% if forloop.index <= 10 %}
          {% include gallery_card.liquid item=item loading="eager" %}
        {% else %}
          {% include gallery_card.liquid item=item %}
        {% endif %}
      {% endfor %}
    </div>
  </div>
</div>
