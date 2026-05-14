---
layout: page
title: moments
permalink: /moments/
nav: true
nav_order: 6
---

<ul class="moment-list">
{% assign moments = site.moments | sort: 'date' | reverse %}
{% for m in moments %}
  <li>
    <p class="moment-meta">
      <small>{{ m.date | date: '%b %d, %Y · %-I:%M %p' }}</small>
      {% if m.tags and m.tags != empty %}
        {% for tag in m.tags %}<small>&nbsp;·&nbsp;#{{ tag }}</small>{% endfor %}
      {% endif %}
    </p>
    {% if m.title %}<h3><a href="{{ m.url | relative_url }}">{{ m.title }}</a></h3>{% endif %}
    <div>{{ m.content }}</div>
    {% unless m.title %}<p><a href="{{ m.url | relative_url }}"><small>permalink</small></a></p>{% endunless %}
    <hr>
  </li>
{% endfor %}
</ul>
