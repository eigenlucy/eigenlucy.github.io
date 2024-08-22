---
layout: page
title: Solar ESPHome with MPPT
description: Low Cost Supercap Enabled Solar Powered ESP32S2
img: assets/img/FMtransmitter.jpg
importance: 1
category: electrical engineering
related_publications: false
---
The goal of this project is to produce low cost solar powered ESPHome devices using the new Expressif ESP32S2FN4R2, TI BQ24251 series PMIC DPM/DPPM, and lithium hybrid supercapacitors. I was recently inspired to try this after tearing down an industrial gas meter powered and finding some supercaps inside used to handle the high power use of intermittent 2G communication when it reports usage info. Many such industrial battery powered systems try to get away with using a strange cell chemistry called thionyl lithium chloride. These cells have the advantages of superior energy density and flat discharge curves, but only on the condition they maintain a fairly consistent, very low discharge rate. Thus, the supercap trickle charges off the thionyl lithium chloride cells, then runs the RF protocol in short bursts. This sort of use of supercaps for average power usage smoothing has lots of other potentially useful applications! The next challenge is making solar supercap MPPT charging cheap enough to make sense for this sort of device. The ESP32S2FN4R2 includes a USB-UART converter, PSRAM (for plugins) and flash inside the main IC while still costing only $1.60. The BQ24251RGER can be had for around $1.20, and provides our 3V3 source and MPPT charging for Lion or lithium supercaps.

ESP32S2 References:
https://www.mouser.com/ProductDetail/Espressif-Systems/ESP32-S2FN4R2?qs=pUKx8fyJudDnZ43tIkHUCQ%3D%3D&utm_id=20105938999&gad
https://docs.espressif.com/projects/esp-idf/en/stable/esp32s2/api-guides/usb-otg-console.html
BQ24251 References:
https://www.ti.com/lit/an/slua687/slua687.pdf?ts=1724359587475&ref_url=https%253A%252F%252Fwww.google.com%252F
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/FMtransmitter.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/FMtransmitter.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    schematic, assembled PCB
</div>
