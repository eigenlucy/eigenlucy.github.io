---
layout: page
title: Micromppt
description: SPV1040 5W Tiny Autonomout MPPT Battery/SC Charger
img: assets/img/Gallery/micromppt.jpg
importance: 1
category: electrical engineering
related_publications: false
---
UPDATE 2/7/25:
Successfully tested the SPV1040 test board charging a supercapacitor and lipo. I redesigned a more compact, optimized PCB with atopile v3.
Gerbers/PCBA files are now built by running ```$ ato build -t all``` as of V3. See the <a href="https://docs.atopile.io/dev/">atopile documentation</a> for more details

Designed for low power solar powered devices. Max panel operating voltage = 5.5V

All of the design files and Gebers/BOM/CPL files for PCBA can be accessed <a href="https://github.com/eigenlucy/micromppt">here.</a>

Based on the <a href="https://www.st.com/en/power-management/spv1040.html#documentation">ST SPV1040</a> solar charging PMIC. See the <a href="https://www.st.com/resource/en/application_note/an3319-stevalisv006v2-solar-battery-charger-using-the-spv1040-stmicroelectronics.pdf">AN3319</a> for additional resources on the operating modes and efficiency calculations.

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/MicroMPPTV2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/Micrompptv2render.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
SPV1040 MicroMPPT V2
</div>

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/SPV1040Testing.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
SPV1040 MicroMPPT V1 solar charging test
</div>

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/micrompptrender.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/micromppt.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
SPV1040 MicroMPPT V1
</div>


