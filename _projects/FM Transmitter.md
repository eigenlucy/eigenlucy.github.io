---
layout: page
title: Bluetooth/FM Transmitter
description: DIY SI4712/ESP32 Base Bluetooth->FM Transmitter
img: assets/img/FMtransmitter.jpg
importance: 3
category: electrical engineering
related_publications: false
---
This is an FM transmitter project based on the Silicon Labs <a href="https://dangerousthings.com/product/xsiid/">SI4713.</a> It uses an ESP32 microcontroller to receive bluetooth audio via A2DP using the <a href="https://github.com/pschatzmann/ESP32-A2DP">ESP32-A2DP Audio Library</a>. This project was designed in AUTODESK EAGLE/Fusion360. Here is a <a href="https://github.com/eigenlucy/ESP32-Bluetooth-FM-Transmitter">GitHub repo</a> containing the PCB files, codebase, and BOM.

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/FMTransmitterSchematic.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/FMtransmitter.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    schematic, assembled PCB
</div>
