---
layout: page
title: Open Flashlight
description: Open Source Flashlight with Atopile
img: assets/img/Gallery/flashlightpcb.jpg
importance: 1
category: electrical engineering
related_publications: false
---
Compact, high power, reliable open source flashlight. Designed with KiCAD, Atopile, and Fusion360

Mechanical design by Jessie Stiles

Design files can be viewed <a href="https://github.com/eigenlucy/uv-lamp">here.</a> PCBA files are placed in the build artifacts with each Actions run.

Builds:
<ul>
    <li>uv-lamp.ato is a 1.6mm aluminum PCB designed to hold 1-3 series 3535SMD LEDs</li>
    <li>ccdriver.ato contains the BMS and LED driver</li>
    <li>attiny816.ato contains the attiny816 build used by the ccdriver</li>
</ul>

Features:
<ul>
    <li><a href="https://www.ti.com/lit/ds/symlink/bq24045.pdf">TI BQ24040</a> Battery Charger</li>
    <li><a href="https://www.ti.com/lit/ds/symlink/tps61169.pdf?ts=1737056749253">TI TPS61169</a>LED Driver</li>
    <li>1A USB Charger</li>
    <li>PWM dimming with adjustable max current</li>
    <li>ATTiny816 microcontroller with open source firmware (WIP)</li>
</ul>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/flashlightpcb.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/FlashlightAssembly.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ccdriver render, assembly
</div>

