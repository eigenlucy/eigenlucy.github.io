---
layout: page
title: ESP32S2 MicroMPPT
description: BQ2425X Dynamic Power Management as Low cost Solar MPPT/BMS
img: assets/img/Gallery/ESP32S2MPPT.jpg
importance: 3
category: electrical engineering
related_publications: false
---
# This project was the first in a series of investigations into using Narrow VDC Dynamic Power Management featured in many modern low-cost USB battery charging ICs for low power solar MPPT Charging. This work has split into a variety of projects in the works., See info on my BQ2X based femtofox mppt hat, bq25x solar charging dev board, and MicroMPPT projects for newer endeavors relating to low power solar charging. This project will soon be revived for a HAOS plant monitor

The goal of this project is to produce low cost solar powered ESPHome devices using the new Expressif ESP32-S2, TI BQ24251 series PMIC DPM/DPPM, and lithium hybrid supercapacitors. I was recently inspired to try this after tearing down an industrial gas meter powered and finding some supercaps inside used to handle the high power use of intermittent 2G communication when it reports usage info. Many such industrial battery powered systems try to get away with using a strange cell chemistry called thionyl lithium chloride. These cells have the advantages of superior energy density and flat discharge curves, but only on the condition they maintain a fairly consistent, very low discharge rate. Thus, the supercap trickle charges off the thionyl lithium chloride cells, then runs the RF protocol in short bursts. This sort of use of supercaps for average power usage smoothing has lots of other potentially useful applications!

See <a href="https://www.ti.com/lit/an/slua687/slua687.pdf?ts=1724359587475&ref_url=https%253A%252F%252Fwww.google.com%252F">this paper</a>" on the use of BQ2X series PMIC DPM for low cost, highly integrated low power MPPT chargging

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/ESP32S2MPPTSchematic.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/ESP32S2MPPTPCB.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    schematic, PCB (received 08/25/24)
</div>
