---
layout: page
title: Micromppt
description: 800mV-5.5Vin MPPT Boost Charger with Autonomous Perturb-and-Observe Setpoint Adjustment
img: assets/img/Gallery/micrompptv3.png
importance: 1
category: electrical engineering
related_publications: false
---
UPDATE 4/22/25:
Micromppt V3 has been release! This is the first relatively final build. The board is now configured for use with single cell lithium packs by default, and I have added a load output, and added battery and load protection circuitry.

All of the design files and Gebers/BOM/CPL files for PCBA can be accessed in the build artifacts of the latest action run in the <a href="https://github.com/eigenlucy/micromppt">Github repo</a>

Micromppt is one of the first third-party packages on the <a href="https://packages.atopile.io/packages/eigenlucy/micromppt">Atopile Packages repo</a>, so you can now easily install it into other atopile projects. I am working on setting up a way to order boards from me directly. Incoming updates will be focused on finalizing a more cost optimized base build and instructions on configuration for other cell chemistries.

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/micrompptV3.png" title="micrompptV3 render" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

To do:
<ul>
<li>Release a cost/size optmized minimal build without protection circuitry, with assertion-driven configutation</li>
<li>Add configuration guidelines and governing equations</li>
<li>Add a list of recommended solar panels</li>
</ul>

OLD NEWS:

UPDATE 2/7/25:
Successfully tested the SPV1040 test board charging a supercapacitor and lipo. I redesigned a more compact, optimized PCB with atopile v3.
Gerbers/PCBA files are now built by running ```$ ato build -t all``` as of V3. See the <a href="https://docs.atopile.io/dev/">atopile documentation</a> for more details

Designed for low power solar powered devices. Max panel operating voltage = 5.5V

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
