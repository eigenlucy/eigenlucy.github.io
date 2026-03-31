---
layout: page
title: Micromppt
description: 800mV-5.5Vin MPPT Boost Charger with Autonomous Perturb-and-Observe Setpoint Adjustment
img: assets/img/Gallery/micrompptv3.png
importance: 1
category: electrical engineering
tags: [electrical engineering, solar]
related_publications: false
giscus_comments: true
---
UPDATE 4/22/25:
Micromppt V3 has been release! This is the first relatively final build. The board is now configured for use with single cell lithium packs by default, and I have added a load output, and added battery and load protection circuitry.

All of the design files and Gebers/BOM/CPL files for PCBA can be accessed in the build artifacts of the latest action run in the <a href="https://github.com/eigenlucy/micromppt">Github repo</a>

Micromppt is one of the first third-party packages on the <a href="https://packages.atopile.io/packages/eigenlucy/micromppt">Atopile Packages repo</a>, so you can now easily install it into other atopile projects. I am working on setting up a way to order boards from me directly. Incoming updates will be focused on finalizing a more cost optimized base build and instructions on configuration for other cell chemistries.

<div class="row justify-content-center">
    <div class="col-sm-5 mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/micrompptV3.png" title="micrompptV3 render" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

{% include kicanvas.liquid src="https://raw.githubusercontent.com/eigenlucy/micromppt/main/elec/layout/default/default.kicad_pcb" %}

<a href="https://github.com/eigenlucy/micromppt/blob/main/elec/src/micromppt.ato">micromppt.ato</a>

```python
{% raw %}
#pragma experiment("BRIDGE_CONNECT")

import ElectricPower, ElectricSignal, ElectricLogic
import Inductor, Capacitor, Resistor, Diode, Fuse

module Micromppt:
    # Based on STEVAL-ISV006V2 schematic
    power = new ElectricPower
    Vpv = new ElectricPower
    Vpvr = new ElectricPower
    Vbat = new ElectricPower

    # Components
    ic = new STMicroelectronics_SPV1040T_package
    R1 = new Resistor; R1.resistance = 1Mohm +/- 10%; R1.package = "0402"
    R2 = new Resistor; R2.resistance = 423kohm +/- 10%; R2.package = "0402"
    R3 = new Resistor; R3.resistance = 1kohm +/- 10%; R3.package = "0402"
    Rf1 = new Resistor; Rf1.resistance = 1kohm +/- 10%; Rf1.package = "0402"
    Rf2 = new Resistor; Rf2.resistance = 1kohm +/- 10%; Rf2.package = "0402"
    Rs = new Resistor; Rs.resistance = 10mohm +/- 5%; Rs.package = "R1206"
    Cin = new Capacitor; Cin.capacitance = 10uF +/- 20%; Cin.package = "0603"
    Cout1 = new Capacitor; Cout1.capacitance = 4.7uF +/- 20%; Cout1.package = "0603"
    Cout2 = new Capacitor; Cout2.capacitance = 10uF +/- 20%; Cout2.package = "0603"
    Cinsns = new Capacitor; Cinsns.capacitance = 100nF +/- 20%; Cinsns.package = "0402"
    Coutsns = new Capacitor; Coutsns.capacitance = 1nF +/- 20%; Coutsns.package = "0402"
    Cf = new Capacitor; Cf.capacitance = 1uF +/- 20%; Cf.package = "0402"
    SW_L = new Inductor; SW_L.lcsc_id = "C5329540"
    Dout = new TECH_PUBLIC_SRV05_4_P_T7_package

    # Connectors
    Vpv_Conn = new JST_Sales_America_B2B_PH_K_S_LF__SN_package
    Vbat_Conn = new JST_Sales_America_B2B_PH_K_S_LF__SN_package
    Vload_Conn = new JST_Sales_America_B2B_PH_K_S_LF__SN_package

    # SPV1040 boost converter topology
    ic.GND ~ power.lv
    Vpvr.hv ~> Cin ~> power.lv
    Vpvr.hv ~> R3 ~> ic.MPP_SET
    ic.MPP_SET ~> Cinsns ~> power.lv
    XSHUT = new ElectricLogic; XSHUT.line ~ ic.XSHUT
    ic.XSHUT ~ ic.MPP_SET
    Vpvr.hv ~> SW_L ~> ic.LX
    ic.VCTRL ~> Coutsns ~> power.lv
    ic.VOUT ~ Rs.p1

    # Current sensing + output voltage divider
    ic.ICTRL_PLUS ~ Cf.p1; ic.ICTRL_PLUS ~ Rf1.p1; Rf1.p2 ~ Rs.p1
    ic.ICTRL_MINUS ~ Cf.p2; ic.ICTRL_MINUS ~ Rf2.p1; Rf2.p2 ~ Rs.p2
    Rs.p2 ~ R1.p1; R1.p2 ~ ic.VCTRL
    R1.p2 ~ R2.p1; R2.p2 ~ power.lv
    Rs.p2 ~ Vbat.hv; Vbat ~ Cout2.power

    # Battery protection (XB3306D)
    bpc = new XySemi_XB3306D_package
    bpc.VDD ~ Vbatr.hv; bpc.VM ~ Vbat.lv; bpc.GND ~ Vbatr.lv

    # Load output with PTC fuse + reverse polarity diode
    Load_D = new Diode; Load_D.lcsc_id = "C2943878"
    ptc = new Littelfuse_0603L150SLYR_package
    Vload_Conn.1 ~ ptc.2; ptc.1 ~> Vbat.hv
    Vload_Conn.2 ~> Load_D ~> Vbatr.lv
{% endraw %}
```

To do:
<ul>
<li>Release a cost/size optmized minimal build without protection circuitry, with assertion-driven configutation</li>
<li>Add configuration guidelines and governing equations</li>
<li>Add a list of recommended solar panels</li>
</ul>

OLD NEWS:

UPDATE 2/7/25:
Successfully tested the SPV1040 test board charging a supercapacitor and lipo. I redesigned a more compact, optimized PCB with atopile v3.
Gerbers/PCBA files are now built by running ```$ ato build -t all``` as of V3. See the <a href="https://docs.atopile.io/dev/">atopile documentation</a> for more details

Designed for low power solar powered devices. Max panel operating voltage = 5.5V

Based on the <a href="https://www.st.com/en/power-management/spv1040.html#documentation">ST SPV1040</a> solar charging PMIC. See the <a href="https://www.st.com/resource/en/application_note/an3319-stevalisv006v2-solar-battery-charger-using-the-spv1040-stmicroelectronics.pdf">AN3319</a> for additional resources on the operating modes and efficiency calculations.

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/MicroMPPTV2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/Micrompptv2render.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
SPV1040 MicroMPPT V2
</div>


<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/micrompptrender.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/micromppt.jpg" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
SPV1040 MicroMPPT V1
</div>
