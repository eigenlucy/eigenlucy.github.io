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
        {% include figure.liquid loading="eager" path="assets/img/Gallery/HABPCBtop.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/HABPCBbottom.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
Assembled boards

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
        {% include figure.liquid loading="eager" path="assets/img/Gallery/HABBlockDiagram.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
Block diagram

Here is the mainboard.ato file for reference:

```
module Mainboard:
    power = new ElectricPower
    power_5V = new ElectricPower; power_5V.gnd ~ power.gnd
    power_3V3 = new ElectricPower; power_3V3.gnd ~ power.gnd
    power_vbat = new ElectricPower; power_vbat.gnd ~ power.gnd
    battery_conn = new XH2A
    battery_conn.p1 ~ power_vbat.vcc; battery_conn.p2 ~ power_vbat.gnd
    C_batconn = new Capacitor; C_batconn.value = 10uF +/- 20%; C_batconn.package = "C0805"
    C_batconn.power ~ power_vbat

    usbc = new USBCConn
    power_usb = new ElectricPower
    power_usb.vcc ~ usbc.usb2.buspower.hv; power_usb.gnd ~ usbc.usb2.buspower.gnd
    power_5V ~ power_usb

    i2c_conn = new _4P1MMJST
    i2c_conn.power ~ power_3V3
    i2c_conn2 = new _4P1MMJST
    i2c_conn2.power ~ power_3V3

    uc = new ESP32S3
    uc.power ~ power_3V3
    uc.i2c ~ i2c_conn.i2c
    uc.i2c ~ i2c_conn2.i2c
    uc.usb2 ~ usbc.usb2

    gpio_conn = new _7P1MMJST
    gpio_conn.p1 ~ uc.io45
    gpio_conn.p2 ~ uc.io48
    gpio_conn.p3 ~ uc.io47
    gpio_conn.p4 ~ uc.io21
    gpio_conn.p5 ~ uc.io14
    gpio_conn.p6 ~ power_3V3.vcc
    gpio_conn.p7 ~ power_3V3.gnd

    pressure_sensor =  new GZP6859D101KPP
    pressure_sensor.i2c ~ uc.i2c
    pressure_sensor.power ~ power_3V3
    C_pres = new Capacitor; C_pres.value = 100nF +/- 20%; C_pres.package = "C0402"
    C_pres.power ~ pressure_sensor.power

    ldo = new Regulator
    ldo.ic.EN ~ ldo.Vin.vcc
    ldo.Vin ~ power_vbat
    ldo.Vin ~ power_usb
    # DO NOT PLUG IN USB-C AND BATTERY AT THE SAME TIME
    ldo.Vout ~ power_3V3
    assert ldo.OUTPUT_VOLTAGE is 3.3V +/- 5%

    lora = new Lora
    lora.power ~ power_3V3
    lora.spi ~ uc.spi2
    lora.lora.spi_cs.line ~ uc.spi2_cs.line

    bme688 = new Nose
    bme688.power ~ power_3V3
    bme688.i2c ~ uc.i2c

    gps = new ATGM336H
    gps.power ~ power_3V3
    gps.i2c ~ uc.i2c
    C_gps1 = new Capacitor; C_gps1.value = 2.2uF +/- 20%; C_gps1.package = "C0603"
    C_gps1.power ~ gps.power
    C_gps2 = new Capacitor; C_gps2.value = 100nF +/- 20%; C_gps2.package = "C0402"
    C_gps2.power ~ gps.power
    gps_bat = new Keystone_2998; gps_bat.power.vcc ~ gps.VBAT; gps_bat.power.gnd ~ power.gnd
    RF_conn = new IPEX
    RF_conn.RF_IN ~ gps.RF_IN
    RF_conn.GND ~ gps.GND
    rf_L = new Murata_Electronics_LQP03TG47NJ02D
    gps.VCC_RF ~ rf_L.p1; rf_L.p2 ~ RF_conn.RF_IN

    cutoff = new Cutoff
    cutoff.power ~ power_vbat # cutoff.power--/\1kohm/\-->|supercap|
    # IO can be remapped as needed for layout, check esp32s3.ato
    cutoff.SC_GATE ~ uc.io0 # Dis/connect supercapacitor
    cutoff.CUTOFF_GATE ~ uc.io1 # Fire cutoff, active high
    cutoff.SC_Sense ~ uc.io37

    ntc = new NCP03WF104F05RL
    R_div = new Resistor; R_div.value = 10kohm +/- 5%; R_div.package = "R0201"
    R_div.p1 ~ uc.power.vcc; R_div.p2 ~ ntc.p1; ntc.p2 ~ uc.power.gnd
    signal TEMP; TEMP ~ ntc.p1
    uc.io16 ~ TEMP
```


