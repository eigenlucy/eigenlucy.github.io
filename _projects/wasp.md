---
layout: page
title: WASP, Wearable AI Synthesis Platform
description: BLE 5.2 module for wearable conversation transcription and analysis
img: assets/img/Gallery/waspmelted.jpg
importance: 1
category: electrical engineering
related_publications: false
---
WASP is a wearable AI assistant platform designed to enable transcription and analysis of your conversations, environments, and activities. It is a tiny, low-power BLE 5.2 device that can be worn as a bracelet or necklace. The integrated MEMS sensor captures audio data, and the integrated IMU+audio accelerometer can collect information on the wears motion, activity level, respiration rate, etc. This data is streamed to a phone/laptop (for now) and uploaded to the users chosen analysis platform. WASP is fully open source/copyleft. Designed with KiCAD and Atopile. Watch the <a href="https://github.com/eigenlucy/wasp">Github repo</a> for updates

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
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasptop.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/waspbottom.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PCB renderings
</div>
