---
layout: page
title: Gamma Spectroscopy
description: Modeling and buidling scintillator + SiPM gamma spectroscopes for radioisotope identification
img: assets/img/Gallery/Femtofox.jpg
importance: 2
category: electrical engineering
related_publications: false
---

You can find files associated with this project [here](https://github.com/eigenlucy/gammadetector.git)

Gamma spectroscopy is the detection of gamma particles and measurement of the energy level of those particles. Gamma detection is done by way of a crystal, called a scintillator, which emits a number of photons when struck with a gamma particle proportional to the energy level of the incident particle. These photons are converted into a current pulse by a silicone photomultiplier (SiPM) which is optically coupled to the scintillator crystal. Additional circuitry amplifies the raw SiPM output, detects pulses, and measures the peak amplitude of each pulse.

A spectrum chart is composed with counts (number of particle detections) on the Y axis and energy level (~ keV-meV) on the x axis:
<div>
  <img src="/assets/img/Gallery/SpectrumExample.png" alt="Example gamma spectrum" style="width: 50%; height: auto; display: block; margin-left: auto; margin-right: auto;">
</div>


Each gamma emitting isotope emits particles at specific charecteristic energy level, so isotopes can be identified by matching spectrum readings to a reference spectrum. As a dosimeter, the detector adds the energy of each detection and measures detection rate (counts per second, CPS) to monitor total exposure.

There are a variety of scintillator crystal chemistries available specialized for different applications (energy ranges, spectral efficicies, and energy resolutions).


<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/Gallery/GAGG.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/GAGGSpectrum.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
GAGG Crystal florescence stimulated with 395nm UV measured with OceanOptics USB2000+
</div>

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/Gallery/CSITl.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/CSITlSiPM.png" title="schematic" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
Thallium doped cesium iodine scintillator crystal with TiO coating for optical shielding, packaged with SiPM
</div>


The rest of this post is split into a few parts:
* a technical overview of particle detection circuits
* a guide to scintillator and SiPM selection
* modeling SiPM microcell avalanche + gamma scintillation events in LTSpice
* transimpedance amplifier, pulse discriminator, and peak detector design (with spice models)
* building a pocket sized DIY gamma detector
* reference material

# Technical Overview

<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="eager" path="/assets/img/Gallery/GammaDectectorCircuit.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Each SiPM contains a number of individually biased microcells, each of which can detect a single photon. Each triggered cell avalanches in parallel, contributing to the total forward current (If). Peak If ranges from 25uA to a few mA, depending on the given SiPM and number of incident photons. The SiPM is reverse biased to something like 25-35V. The anode of the SiPM is connected to a low gain (e.g. 2) transimpedance amplifier to convert the SiPM output to a usable signal. This signal is routed to both a comparator which functions as a pulse discriminator and a peak detector which holds the peak signal level.
