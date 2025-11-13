---
layout: page
title: Mind In Vitro
description: 
img: assets/img/Gallery/atopile.jpg
importance: 5
category: electrical engineering
related_publications: false
---

The original [Mind In Vitro](https://mindinvitro.illinois.edu) publication provides a low cost, open source headstage system to interface cultured neurons with a computer. I have recently been working on replicating and revising the system with the help of some folks at Frontier Tower and  Neuromorph VC.

Many of the design files and protocols can be found in the [project's Github page](https://mindinvitro.illinois.edu)

## Tools/materials:
* Formlabs 3B/4B Resin printer for fluidic interface
* xTool CO2 Laser for acrylic parts
* Cloudray 60W MOPA 1064nm Fiber Laser
* Bambu Labs X1C FDM 3D Printer
* Basic electronics supplies
* Polyimide film (Kapton), no adhesive backing
* Currently testing HMDS and SU-8 for passivation
* Currently testing nano coating machine for passivation layer deposition
* LCR meter/impedance analyzer for electrode quality analysis

## Electrode Interface PCBs

This board is responsible for connecting the MEA electrodes to our signal acquisition system. KiCAD design files are provided by the MIV team on [GitHub](https://github.com/GazzolaLab/MiV-OH/tree/main/docs/PCB). Boards are ordered from JLCPCB, PCBWAY, etc. A 3D printed jig is used to hold pogo pins in place for soldering.

## Acquisition System

The acquisition system captures and records electrical activity sampled by the MEA array. The critical system parameters are:
* Channel count, determines the number of electrodes which can be recorded
* Sample rate, determines the frequency of neuronal activity which can can measure
* Bit resolution, determines the precision of the electrode voltage measurements

There are a few options for acquisition hardware:
* [OpenEphys Acquisition Board (3rd Gen)](https://open-ephys.org/acquisition-system/oeps-9029)
* [Intan RHD Recording System](https://intantech.com/RHD_system.html)
* [Science Corporation SciFi Headstage](https://science.xyz/technologies/scifi/)

Acquisition boards (64-128ch each) containing analog front ends, simultaneous sampling ADCs, and (optionally) stimulation drivers plug directly into headstage interface PCBs and connect to the recording system via SPI.

## MEAs

MEA fabrication is one of the major challenge for this project. This is something I've been [working on](eigenlucy.com/projects/mea_arrays) for a while, but working with living neurons and higher array density is proving quite challenging.

There are a few components of MEA fabrication:
* Biocompatibility of underlying materials and electrode surfaces
* Patterning of pogo contacts and connecting traces (low density) + microelectrode array (high density)
* Passivation of connecting traces
