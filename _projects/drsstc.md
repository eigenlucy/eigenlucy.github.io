---
layout: page
title: DRSSTC1
description: Tiny Dual Resonant Solid State Telsa Coil
img: assets/img/Gallery/DRSSTC3D.jpg
importance: 3
category: electrical engineering
related_publications: false
---

A dual resonant telsa coil is a device that generates extremely high voltages (>1MV) with an air core resonant transformer, meaning both sides of the transformer are tuned to matching frequencies. These devices require careful design to cope with high power resonant operation. This build is designed to be compact, mains powered, and transportable. I took lots of inspiration from Steve Ward's incredible blog, [stevehv](https://www.stevehv.4hv.org), featuring many of his own DRSSTC builds. I am using one of Ward's UD1.3 drivers for now, tho I may soon upgrade to a UD2.7.

# Components:
* 2x [CM300DY-12NF](https://www.alldatasheet.com/datasheet-pdf/view/545904/POWEREX/CM300DY-12NF.html) 600V 300A IGBT half bridge modules for the primary full bridge inverter.
* 6x AVX FPG66 .5uF 1.6kV 19Arms film capacitors for the primary bridge
* 2x Nippon U36D 6800uF 315V aluminum electrolytic capacitors for the mains doubler/rectifier
* UD1.3 Driver by [Steve Ward](https://www.stevehv.4hv.org/new_driver.html)

# Math/simulation:

* Primary/secondary resonant frequency calculations on [Desmos](https://www.desmos.com/calculator/atpbmw5gvd)

# Schematics:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/DRSSTCSchematic.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/UD1_3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

# CAD/Assembly:

 <div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/DRSSTC3D.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
