---
layout: page
title: DIY Airtag
description: Low cost open-source Find My Network geolocator
img: assets/img/Gallery/waymomap.png
importance: 1
category: electrical engineering
related_publications: false
---
The Find My network is a massive mesh network all iOS devices are enrolled designed to enable location and status tracking of BLE connected Apple devices, as well as low-cost, low-power BLE transponders (AirTags). The protocol works by passing information (contained in UUIDs) advertised by BLE tags/servers seen by devices such as Macs and iPhones to the Find My Network, where it can then be accessed by the registered device owner. Several years ago, the research group behind the <a href="https://github.com/seemoo-lab/openhaystack">OpenHayStack</a> project released information on the UUID generation scheme, and provided information on registering BLE servers to the Find My Network, and provided instructions on creating DIY FakeTags with ESP32s. Since, several contributors have liberated this functionality from Apple Hardware alltogether (see the Macless Haystack project), and extended support to other microcontrollers (see the FakeTag project)

This project builds on this work and provides a hardware platform for further Find My Network research and hacking.
