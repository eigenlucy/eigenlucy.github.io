---
layout: page
title: DIY Airtag
description: Low cost open-source Find My Network geolocator
img: assets/img/Gallery/waymomap.png
importance: 3
category: electrical engineering
related_publications: false
---
The Find My network is a massive mesh network all iOS devices are enrolled designed to enable location and status tracking of BLE connected Apple devices, as well as low-cost, low-power BLE transponders (AirTags). BLE tags generated according to the Find My networks protocols can be seen by other Apple devices, and reported to device owner through the the Find My Network. Several years ago, the research group behind the <a href="https://github.com/seemoo-lab/openhaystack">OpenHayStack</a> project released information on registering BLE servers to the Find My Network, and provided instructions on creating DIY FakeTags with ESP32s. Since, several contributors have liberated this functionality from Apple Hardware alltogether (see the Macless Haystack project), and extended support to other microcontrollers (see the FakeTag project).

This project builds on this work and provides a hardware platform for further Find My Network research and hacking.
