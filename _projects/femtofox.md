---
layout: page
title: Femtofox Project
description: Configuration guidelines, power usage testing, RF transmit power testing
img: assets/img/Gallery/Femtofox.jpg
importance: 1
category: electrical engineering
related_publications: false
---
<a href="https://github.com/femtofox/femtofox">Femtofox</a> is a project to create a Linux Meshtastic node based on the low cost Luckfox Mini SBC.


# Configuration
## Requirements
<li>A femtofox board</li>
<li>A microSD card</li>
<li>A disk imaging tool, such as Rufus or Balena Etcher</li>
<li>Some sort of SSH+Serial client like <a href="https://www.putty.org/">PuTTY</a></li>
<li>A Meshtastic Client. iOS support is a WIP, but the Play store Meshtastic app works. I use <a href="https://github.com/pdxlocations/contact">contact</a> to connect via the pure python Meshtatic CLI on Arch Linux</li>

## FoxBuntu Install
Follow the instructions in the femotfox repo on <a href="https://github.com/femtofox/femtofox/wiki/Getting-Started">flashing the foxbuntu image</a> onto the LuckFox. 

The first boot can take up to 5 minutes to complete, and subsequent boots should take around 30 seconds.

As of Foxbuntu V0.99, you can configure the femtofox via web browser @ https://femtofox.local:7681. If you have a FemtoFox Pro, you can connect over USB. Set the device baud rate to 115200 and press enter in the console window a few times if you don't see anything. You should see the Femtofox logo, then be promted to set a root password. After this, you can enter $ sudo femto-config to begin configuring the unit.

# Power Testing
3V3 and 5V power testing setup consists of an AD620 instrumentation amplifier as a low side current sensor, a fancy power meter, and an oscilloscope for assessing noise.

# RF Transmit Power Testing
Based on the LoRa Alliance <a href="https://lora-alliance.org/wp-content/uploads/2021/04/Gateway-Test-and-Measurement-Guidelines-Issue01.pdf">LoRa gateway RF Testing Guidelines</a>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/FemtofoxGatewayTestSetup.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

