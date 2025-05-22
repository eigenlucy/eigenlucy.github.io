---
layout: page
title: Spacebridge HAB PCB
description: High altitude balloon payload PCB with LoRa, GPS, heating, enviromental sensing, and a cutoff mechanism
img: assets/img/Gallery/spacebridgehabpcbrender.png
importance: 1
category: electrical engineering
related_publications: false
---
<a href="https://www.noisebridge.net/wiki/Spacebridge">Spacebridge</a> is a DIY high altitude ballooning group at Noisebridge Hackerspace. We are using low cost Meshtastic LoRa hardware and GPS modules for license free tracking and telemetry. Thus far, the each payload's been assembled on protoboard from a series of dev modules. This has created a number of issues with repeatability and last minute failures. So I am working on a new payload PCB :)


Follow my <a href="https://github.com/eigenlucy/spacebridgehabpcb">Github repo</a> for development updates

Features:
<ul>
    <li>ESP32-S3 Microcontroller with WiFi and BLE</li>
    <li>E22900M22S LoRa Transciever</li>
    <li>ATGH336M GPS Module</li>
    <li>100kPA Pressure Sensor</li>
    <li>BME688 Temp, Humidity, and Gas Sensor</li>
    <li>x2 Backup NTC temp Sensors</li>
    <li>x2 Quiic I2C Ports + 7pin GPIO header</li>
    <li>Integrated cutoff mechanism and payload heater with supplemetary supercap supply</li>
</ul>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/spacebridgehabpcbrender.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/SpacebridgePCBBack.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
PCB renderings
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/SpacebridgeHABPCBDiagram.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
Block diagram
