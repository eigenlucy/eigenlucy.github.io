---
layout: post
title: Marx Generator Notes
date: 2025-07-23 # Today's date, you can change this
permalink: /eigenlucy/marx-generator/
sitemap: false
---
Marx Generator notes

<div>
  <img src="/assets/img/Gallery/Marx-stage.png" alt="Marx Generator stage" style="width: 50%; height: auto; display: block; margin-left: auto; margin-right: auto;">
</div>
<div>
  <img src="/assets/img/Gallery/Marx-stage2.png" alt="Marx Generator stage" style="width: 50%; height: auto; display: block; margin-left: auto; margin-right: auto;">
</div>

Notes:
<li>Mechanically actuated Marx eliminates the need for spark gaps</li>
<li>A neon sign transformer source is a bit of a hacky solution. It gives you an independently UL certified interfacing with mains and saves lots of time though. In the future this should be a custom driver made from widely available CO2 laser ferrite transformers</li>

References:
<li>On dielectric breakdown in rock <a href="https://link.springer.com/article/10.1007/s00603-024-03851-4">link</a></li>

BOM:
<ul>
<li>x2 UL rated neon sign transformer like <a href="https://www.ebay.ca/itm/354859756450">this</a></li>
<li>x8 PRHVP 2A 20kV HV diodes like <a href="https://www.amazon.com/Comimark-20000V-Rectifier-High-Voltage-181975mm/dp/B087PRYGRT">these</a></li>
<li>x1 <a href="https://www.ebay.ca/itm/126052798176">HV</a> Cloudray ferrite transformer</li>
<li>x10 <a href="https://www.ebay.com/itm/296645015965">HV</a> 20kV Murata pulse capacitors. <a href="https://mm.digikey.com/Volume0/opasdata/d220001/medias/docus/2584/High%20Voltage%20Ceramic%20Capacitors.pdf">Datasheet</a>.</li>
<li>4ft of copper stock for cap bank bus bars, 50mm wide like <a href="https://www.amazon.com/Copper-Flat-Long-305mm-Stock">this</a> + ~8mm wide</li>
<li>Mangetic proximity switches with NC and NO outputs like <a href="https://www.amazon.com/EPLZON-Magnetic-Normally-Proximity-Equipment">this</a> + magnets</li>
<li>x3 >2in pnematic actuator like <a href="https://www.amazon.com/Tailonz-Pneumatic-Air-Cylinder-Bore/dp/B07THMDZ61">this</a></li>
<li>x1 three way hand operated 5 position pnematic valve like <a href="https://www.amazon.com/TAILONZ-PNEUMATIC-Pneumatic-Push-Pull-4H230-08C/dp/B086V8HDS7">this</a></li>
<li>x2 electrically operated 5 position 3 way valves like <a href="https://www.amazon.com/AIRIX-4V310-10-Pneumatic-Solenoid-Pilot-Operated">this</a></li>
<li>M3-5 screws, spade and ring connectors, etc</li>
<li>~15ft NPT3 nylon(!) pnematic air tubing like <a href="https://www.amazon.com/CheeMuii-Pneumatic-Tubing-System-Transfer/dp/B0DCJKKDXD">this</a></li>
<li>x1 Air compressor like <a href="https://www.amazon.com/ECOMAX-Compressor-Portable-Pneumatic-Accessories/dp/B0DGGFW73S">this</a></li>
<li>x4 solid state relays like <a href="https://www.amazon.com/SSR-25DA-3-32VDC-Output-24-480VAC-Plastic">this</a></li>
<li>Arduino Uno and terminal blocks like <a href="https://www.amazon.com/Electronics-Salon-Arduino-Terminal-Breakout-Module">this</a></li>
<li>Acrylic sheets (1/4in and 1/8in)</li>
<li>fused AC sockets like <a href="https://www.amazon.com/EPLZON-Module-Socket-Connector-Extension/dp/B0CN721ZS7">this</a></li>
<li>x12 3W 1Mohm HV resistors, like <a href="https://www.amazon.com/QINIZX-Voltage-Resistor-Marx-Generator-Rectifier/dp/B09FDYKJBQ">this</a></li>
<li>x6 high power servos, eg HS311</li>
</ul>
