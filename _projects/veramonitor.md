---
layout: page
title: Veramonitor HAOS Control Panel
description: ESP32-S3 based ESPHome HAOS Panel
img: assets/img/Gallery/veramonitor.jpg
importance: 2
category: electrical engineering
related_publications: false
---
For vera

UPDATE JANUARY 2025:
I do not know why I added a usb-to-uart converter here, and it's been removed for future builds. Rust firmware in progress, see the <a href="https://github.com/eigenlucy/ESPHome-Panel">Izzymonitor</a> branch of the ESPHome-Panel github for more details.

First in my line of state of the art wife surveillance state tech ;)

All of the design files and Gebers/BOM/CPL files for PCBA can be accessed <a href="https://github.com/eigenlucy/ESPHome-Panel/tree/main">here.</a> Gerbers and PCBA files are generated with ```$ ato build -t all``` as of V3

Imagined as a bus/train depature board :)
Integration with BART and MUNI APIs in progress

Features:
<ul>
    <li>ESP32-S3 Microcontroller with JTAG debugging port</li>
    <li>I2S digital microphone for voice commands (WIP)</li>
    <li>6 line LCD display</li>
    <li>Neopixel meters</li>
    <li>Quiic and JST headers to connect additional sensors and interfaces</li>
</ul>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/veramonitorrender.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/veramonitor.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
