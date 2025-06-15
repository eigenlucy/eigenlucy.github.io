---
layout: page
title: WASP, Wearable AI Synthesis Platform
description: BLE 5.2 module for wearable conversation transcription and analysis
img: assets/img/Gallery/wasppcbtop.png
importance: 1
category: electrical engineering
related_publications: false
---

UPDATE 06/14/25, V1 PCBs arrived!

WASP is a wearable AI assistant platform designed to enable transcription and analysis of your conversations, environments, and activities. It consists of a tiny, low-power BLE 5.2 device which can be worn as a bracelet or necklace. The sensor array can collect audio data, detect gestures, count steps, track absolute orientation, monitor activity level, and measure heart+respiration rate. This data is streamed to a phone or other device over BLE and processed by the users chosen analysis platform. WASP is fully open source/copyleft. Designed with KiCAD and Atopile. Watch the <a href="https://github.com/eigenlucy/wasp">Github repo</a> for updates. PCBA files and programming guides will be posted Soon.

Features:
<ul>
    <li>Tiny footprint (27x14mm^2), well suited for braclets/necklaces</li>
    <li>Based on the <a href="https://www.digikey.com/en/products/detail/ai-thinker/PB-03/16688850">PB03 PHY6262 BLE5.2 Module</a> with BLE Audio and BLE Mesh</li>
    <li>Low TX/RX power (<25mW), ultra-low deep-sleep power (~3uW)</li>
    <li><a href="https://www.ti.com/lit/ds/symlink/bq24040.pdf?ts=1748290055470">TI BQ2404x 1A Lion Charger</a></li>
    <li>TDK Inversense high gain omnidirectional MEMS microphone</li>
    <li><a href="https://www.st.com/en/mems-and-sensors/lsm6dsv.html">LSM6DSV 6-axis IMU with sensor fusion and gesture detection</a></li>
</ul>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasppcbtop.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasppcbbottom.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PCB layout (top and bottom layers)
</div>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasppcbtop.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasppcbbottom.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PCB layout (top and bottom layers)
</div>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasptop.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/waspbottom.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PCB 3D renderings
</div>
