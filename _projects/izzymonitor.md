---
layout: page
title: HAOS Control Panel
description: Izzymonitor :3 ESP32-S3 based ESPHome HAOS Panel
img: assets/img/Gallery/izzymonitor.jpg
importance: 1
category: electrical engineering
related_publications: false
---
For izzy
All of the design files and Gebers/BOM/CPL files for PCBA can be accessed <a href="https://github.com/eigenlucy/ESPHome-Panel/tree/izzymonitor/">here.</a> PCBA files are placed in the build artifacts with each Actions run. 

Features:
<ul>
    <li>ESP32-S3 Microcontroller with JTAG debugging port</li>
    <li>I2S digital microphone for voice commands (WIP)</li>
    <li>3W I2S Class D amplifier + audio quality speaker for TTS</li>
    <li>MX Keyswitches with neopixel backlighting</li>
</ul>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/izzymonitorrender.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/izzymonitor.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    render, assembled pcb
</div>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/izzymonitorkeys.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
   <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/izzymonitorback.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div> 
</div>
<div class="caption">
    neopixel back lighting, wild robot silkscreen :3
</div>

