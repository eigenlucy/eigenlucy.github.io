---
layout: page
title: Femtofox Project
description: Configuration guidelines, power usage testing, RF transmit power testing
img: assets/img/Gallery/femtofox-mppt-draft.jpg
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
Follow the instructions in the femotfox repo on <a href="https://github.com/femtofox/femtofox/blob/main/foxbuntu_install.md">flashing the foxbuntu image</a> onto the LuckFox. 

The first boot can take up to 5 minutes to complete, and subsequent boots should take around 30 seconds.

If you have a FemtoFox Pro, you can connect over USB. Set the device baud rate to 115200 and press enter in the console window a few times if you don't see anything. You should see the Femtofox logo, then be promted to set a root password. After this, you can enter $ sudo femto-config to begin configuring the unit.

# Power Testing

# RF Transmit Power Testing
