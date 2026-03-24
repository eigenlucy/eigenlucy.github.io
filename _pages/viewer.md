---
layout: default
permalink: /viewer/
title: Document Viewer
nav: false
---

<div class="pdf-viewer-wrapper">
  <div class="pdf-controls">
    <button id="pdf-prev" title="Previous page (←)">&larr; Prev</button>
    <span>
      Page <input id="pdf-page-input" type="number" min="1" value="1"> / <span id="pdf-page-count">–</span>
    </span>
    <button id="pdf-next" title="Next page (→)">Next &rarr;</button>
    <a id="pdf-download" href="#" download title="Download PDF">Download</a>
  </div>
  <div id="pdf-container">
    <canvas id="pdf-canvas"></canvas>
    <div id="pdf-text-layer"></div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs" type="module"></script>
<script src="{{ '/assets/js/pdf-viewer.js' | relative_url }}" type="module"></script>
