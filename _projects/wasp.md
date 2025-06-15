---
layout: page
title: WASP, Wearable AI Synthesis Platform
description: BLE 5.2 module for wearable conversation transcription and analysis
img: assets/img/Gallery/wasppcbtop.png
importance: 1
category: electrical engineering
related_publications: false
---

UPDATE 06/14/25, V1 PCBs arrived!

WASP is a wearable AI assistant platform designed to enable transcription and analysis of your conversations, environments, and activities. It consists of a tiny, low-power BLE 5.2 device which can be worn as a bracelet or necklace. The sensor array can collect audio data, detect gestures, count steps, track absolute orientation, monitor activity level, and measure heart+respiration rate. This data is streamed to a phone or other device over BLE and processed by the users chosen analysis platform. WASP is fully open source/copyleft. Designed with KiCAD and Atopile. Watch the <a href="https://github.com/eigenlucy/wasp">Github repo</a> for updates. PCBA files and programming guides will be posted Soon.

Features:
<ul>
    <li>Tiny footprint (27x14mm^2), well suited for braclets/necklaces</li>
    <li>Based on the <a href="https://www.digikey.com/en/products/detail/ai-thinker/PB-03/16688850">PB03 PHY6262 BLE5.2 Module</a> with BLE Audio and BLE Mesh</li>
    <li>Low TX/RX power (<25mW), ultra-low deep-sleep power (~3uW)</li>
    <li><a href="https://www.ti.com/lit/ds/symlink/bq24040.pdf?ts=1748290055470">TI BQ2404x 1A Lion Charger</a></li>
    <li>TDK Inversense high gain omnidirectional MEMS microphone</li>
    <li><a href="https://www.st.com/en/mems-and-sensors/lsm6dsv.html">LSM6DSV 6-axis IMU with sensor fusion and gesture detection</a></li>
</ul>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasppcbtop.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasppcbbottom.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PCB layout (top and bottom layers)
</div>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasppcbtop.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasppcbbottom.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PCB layout (top and bottom layers)
</div>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/wasptop.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/waspbottom.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    PCB 3D renderings
</div>

Main.ato reference:
```
import ElectricPower, USB2_0_IF, Resistor, Capacitor
from "pb03.ato" import PB03
from "zts6216.ato" import ZTS6216
from "atopile/usb-connectors/usb-connectors.ato" import USBCConn
from "atopile/ti-bq2404x/bq2404x.ato" import BQ24045DSQR
from "eigenlucy/ncp1529asnt1g/main.ato" import Regulator
from "lsm6dsltr.ato" import LSM6DSL
from "smd1812p110tf.ato" import SMD1812P110TF
from "mmict39020001.ato" import MMICT390200012

"""
TO DO:
# Define uC JTAG(if necessicary), I2C port, and audio codec
# Check ideal operating voltage and make sure regulator module is configured correctly
# add dw01 module and configure shutdown modes
# Figure out USB-C button?
"""

module Wasp:
    power_batt = new ElectricPower
    power_3V3 = new ElectricPower
    power_5V = new ElectricPower
    power_batt.gnd ~ power_3V3.gnd

    usb = new USBCConn
    usb.conn.VBUS ~ power_5V.vcc; usb.conn.GND ~ power_5V.gnd

    uc = new PB03
    uc.power ~ power_3V3
    uc.usb2 ~ usb.usb2
    C1 = new Capacitor; C1.value = 100nF +/- 10%; C1.package = "C0402"
    C1.power ~ power_3V3
    C2 = new Capacitor; C2.value = 2.2uF +/- 10%; C2.package = "C0603"
    C2.power ~ power_3V3

    mic = new MMICT390200012
    mic.power ~ power_3V3
    mic.i2s ~ uc.i2s
    Cmic = new Capacitor; Cmic.value = 100nF +/- 10%; Cmic.package = "C0402"
    Cmic.power ~ mic.power

    imu = new LSM6DSL
    imu.power ~ power_3V3
    imu.i2c ~ uc.i2c

    bms = new BQ24045DSQR
    power_batt ~ bms.power_batt
    power_5V ~ bms.power_in

    ldo = new Regulator
    ldo.OUTPUT_VOLTAGE = 3.3V +/- 5% # Maybe lower voltage?
    ldo.Vin ~ power_batt
    ldo.Vout ~ power_3V3
    ldo.ic.EN ~ uc.gpios[5]
    ldo_pullup = new Resistor; ldo_pullup.value = 100kohm; ldo_pullup.package = "R0201"
    ldo_pullup.p1 ~ ldo.ic.EN; ldo_pullup.p2 ~ power_3V3.vcc
```
