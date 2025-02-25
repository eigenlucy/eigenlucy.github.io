---
layout: page
title: Femtofox Project
description: Configuration guidelines, power usage testing, RF transmit power testing
img: assets/img/Gallery/Femtofox.jpg
importance: 1
category: electrical engineering
related_publications: false
---
## Update Feburary 25, 2025
My first round of tests are wrapping up. I am looking for a good 900mhz source with a known output level (I have one reserved in the next few days), until then take the TX power results with a grain of salt (+/- 1dBm). Consumption results should be solid, but for now I'd recommend a 5V supply until we verify the output levels off of 3V3. For anyone in the EU looking to stay under 500mW / 27dBm TX power, 18dBm appears to be at about 26.9dBm out, so somewhere in the 16-18dBm range should work well depending on your risk tolerance ;P


You can see my test results <a href="https://github.com/eigenlucy/Meshtastic-Test-Scripting/tree/main/results">here :)</a>


<a href="https://github.com/femtofox/femtofox">Femtofox</a> is a project to create a Linux Meshtastic node based on the low cost Luckfox Mini SBC.


# Configuration
## Requirements
<li>A femtofox board</li>
<li>A microSD card</li>
<li>A disk imaging tool, such as Rufus or Balena Etcher</li>
<li>Some sort of SSH+Serial client like <a href="https://www.putty.org/">PuTTY</a></li>
<li>A Meshtastic Client. iOS support is a WIP, but the Play store Meshtastic app works. I use <a href="https://github.com/pdxlocations/contact">contact</a> to connect via the pure python Meshtatic CLI on Arch Linux. USB Serial configuration is available on the Femtofox Pro</li>

## FoxBuntu Install
Follow the instructions in the Femotfox repo on <a href="https://github.com/femtofox/femtofox/wiki/Getting-Started">flashing the foxbuntu image</a> onto the LuckFox. 

The first boot can take up to 5 minutes to complete, and subsequent boots should take around 30 seconds.

As of Foxbuntu V0.99, you can configure the femtofox via web browser @ https://femtofox.local:7681. If you have a FemtoFox Pro, you can connect over USB. Set the device baud rate to 115200 and press enter in the console window a few times if you don't see anything. You should see the Femtofox logo, then be promted to set a root password. After this, you can enter $ sudo femto-config to begin configuring the unit.

If you are having trouble with the femtox.local page, you can ssh into your femto with something like ```$ ssh femto@{UR_FEMTO_IP}```. Find the IP on your LAN with <a href="https://nmap.org/">NMap</a> by running something like ```$ sudo nmap -p 22 {your IP}/24```.

# Power Testing
The Femtofox Pro equipped with the Ebyte E22-900M30S LoRa gateway consumed an average of 360mW on 3V3 and 400mW on 5V. This is amazing! These tests were performed with an ethernet/ssh port open, and with meshtasticd running with the default (max) transmit power setting. Further testing is required to investigate the difference in the peak power usage on a 3V3 and 5V supply. This is likely due to a limit on the output power of the LoRa module (which TRANSMITS up to 1.2W / 31dBm at max power according to my testing) at 3V3 volt, not higher efficiency. Results on this are coming soon, along with recommendations for improved decoupling and filtering to prevent the sagging on the 5V and 3V3 lines currently observed.

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/5VSMUPowerTestResultsSummary.png title="5V Power Consumption Results" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Equipment Utilized:
<li>Rigol DHO804 Oscilloscope</li>
<li>Keysight EDU36311A DC PSU</li>
<li>Keithly 2450 SMU</li>

# RF Transmit Power Testing
The Ebyte E22-900M30S LoRa module contains an internal amplifier, which amplifies the SX1268 22dBm max ouput level as high as 31dBm. These tests were performed to evaluate the actual TX power levels of the modules to help ensure compliance with local regulations (namely in the EU, which caps emissions in the LoRa band to a max of 500mW / 27dBm)

Based on the LoRa Alliance <a href="https://lora-alliance.org/wp-content/uploads/2021/04/Gateway-Test-and-Measurement-Guidelines-Issue01.pdf">LoRa gateway RF Testing Guidelines</a>
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/FemtofoxGatewayTestSetup.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/FemtofoxGatewayTestSetup.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
   <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/GalleryE22-900M30S-TXPOWER-RESULTS.png" title="tx power results" class="img-fluid rounded z-depth-1" %}
    </div> 
</div>

## Equipment Utilized:
<li><a href="https://www.minicircuits.com/WebStore/dashboard.html?model=VAT-10A%2B&srsltid=AfmBOopckfpry16G-akbiZXm-Gqm3-jvujM1NTpF60RuBGH8qnNVZdg8">Mini-Circuits VAT-10A+</a> + <a href="https://www.minicircuits.com/WebStore/dashboard.html?model=VAT-20A%2B&srsltid=AfmBOoozK4Fy6i-COwgI8UHc4esJiRiAXFEfWHltpLQLQljSdLcpDM0r">VAT-20A+ Attenuator</a></li>
<li><a href="https://www.minicircuits.com/WebStore/dashboard.html?model=ZX30-9-4-S%2B&srsltid=AfmBOopdqCBTN6KkLpb9eHuEoMRAXftzYnE-KRgJKLMOqU16P11W7STQ">Mini-Circuits ZX30-9-4-S Directional Coupler</a></li>
<li><a href="https://www.minicircuits.com/pdfs/ZX47-40+.pdf">Mini-Circuits ZX47-40+ Power Detector</a></li>
<li>NanoVNA V2</li>
<li>TinySA Ultra</li>

