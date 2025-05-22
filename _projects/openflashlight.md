---
layout: page
title: Open Flashlight
description: Open Source Flashlight with Atopile
img: assets/img/Gallery/OpenFlashlightPCB2.png
importance: 2
category: electrical engineering
related_publications: false
---
Compact, high power, reliable open source flashlight. Designed with KiCAD, Atopile, and Fusion360

Mechanical design by Jessie Stiles

PCBA files + 3D models can be viewed <a href="https://github.com/eigenlucy/uv-lamp">here.</a> PCBA files are placed in the build artifacts with each Actions run.

Check out my <a href="https://hackaday.io/project/202611-openflashlight">Hackaday post</a> on this build.

Builds:
<ul>
    <li>uv-lamp.ato is a 1.6mm aluminum PCB designed to hold 1-3 series 3535SMD LEDs</li>
    <li>ccdriver.ato contains the BMS and LED driver</li>
    <li>attiny816.ato contains the attiny816 build used by the ccdriver</li>
</ul>

TO DO:
<ul>
    <li>Finish and test ccdriver</li>
    <li>Add battery and LED current sensing via the ATTinyA ADCs (+ investigate 2-series true differential ADCs)</li>
    <li>Finish mechanical design</li>
    <li>Create builds for other LEDs and battery sizes</li>
</ul>

Features:
<ul>
    <li><a href="https://www.ti.com/lit/ds/symlink/bq24045.pdf">TI BQ24040</a> Battery Charger</li>
    <li><a href="https://www.ti.com/lit/ds/symlink/tps61169.pdf?ts=1737056749253">TI TPS61169</a>LED Driver</li>
    <li>1A USBC Charger</li>
    <li>PWM dimming with adjustable max current</li>
    <li><a href="https://github.com/SpenceKonde/megaTinyCore/blob/master/megaavr/extras/ATtiny_x16.md">ATTiny816</a> microcontroller with open source firmware (WIP). Programmable over <a href="https://github.com/SpenceKonde/AVR-Guidance/blob/master/UPDI/jtag2updi.md">UPDI</a> using a standard serial adapter.</li>
</ul>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/OpenFlashLightRender.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/FlashlightAssembly.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    ccdriver render, assembly
</div>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/OpenFlashlightAssembly.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/OpenFlashlightHeatsink.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Testing fit and threading for enclosure, testing diodes
</div>
<div class="row">
  <div class="col-sm mt-2 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/TheOwlsAreNotWhatTheySeem.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
    Fluorescence of alleged "uranium glass" (radiacode 103 says otherwise)
</div>
