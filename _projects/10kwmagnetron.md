---
layout: page
title: 10kW Microwave Furnace
description: 10kW of 2.4GHz RF radiation for metal and glasswork :3
img: assets/img/Gallery/10kwmagnetron.jpg
importance: 1
category: electrical engineering
related_publications: false
---
## UPDATE Feb 2025:
This project got put on hold since I left South Carolina and no longer had the space por infrastructure, but it has been revived!! Details to be worked out, but I am working with the folks over at Noisebridge to build the driver, cooling and waveguide for an insane microwave furnace in their space!

There have also been some updates to the state of the project:

So far I have acquired:
<ul>
    <li><a href="https://www.relltubes.com/documents/Datasheets/Datasheet%20-%20CW%20Magnetrons/NL10270-5-Datasheet.pdf">The Magnetron</a></li>
    <li>A suitable<a href="https://www.recycledgoods.com/eratron-dc-sputtering-plasma-power-supply-pps-8210-2kv-rs-mf">10kW DC Sputtering PSU</a></li>
    <li>A chiller for the magnetron cooling loop + appropriate tubing</li>
    <li>mSLA Printable Wax Castable Resin, Petrobond, and SiC crucibles</li>
    <li>Supplies to build the LLC resonant converter to step up the 2kV from the main PSU to the 9.6kV 0-1.6A DC PSU needed for the magnetron</li>
</ul>

We still need to sort out:
<ul>
    <li>How can we work on a project that involves HV and 10kW of RF radiation in a community space without introducing risks and what do we need to be doing to be able to work on everything at NB without interfering with other operations if this takes a few months? Is there a guild we should be coordinating with?</li>
    <li>Constructing and testing the resonant 2kV->9kV LLC step up converter</li>
    <li>Constructing the waveguide</li>
    <li>Constructing a rolling enclosure with integrates all the equipment and work space to safely operate the system</li>
    <li>How to ensure everything is safe in a community space. This will include discussions with Noisebridge about interlock systems, HV isolation, RF leakage detection, thermal shutdown, extensive documentation, training courses, etc</li>
    <li>Test <a href="https://www.youtube.com/watch?v=P1VmIYheuU4">DIY SiC crucibles and crucible insulation</a></li>
</ul>

You can see this magentron in action <a href="https://www.youtube.com/watch?v=mg79n_ndR68">here</a> as a teaser :)

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/10kwmagnetron.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/cryo.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/SputteringPSUs.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Magnetron, Chiller and Tubing, 10kW sputtering PSUs
</div>
