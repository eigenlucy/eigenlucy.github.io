---
layout: default
permalink: /gallery/
title: gallery
description: some of my projects from the last few years 
nav: true
nav_order: 1
---

<div class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>

  <div class="tag-filter-container">
      <!-- Default tags -->
      <div class="default-tags">
        <button class="tag-filter" data-tag="featured"><i class="fa-solid fa-hashtag"></i> Featured</button>
        <button class="tag-filter" data-tag="all"><i class="fa-solid fa-hashtag"></i> All</button>
        <button class="tag-filter" data-tag="image"><i class="fa-solid fa-hashtag"></i> Image</button>
        <button class="tag-filter" data-tag="video"><i class="fa-solid fa-hashtag"></i> Video</button>
        <button class="tag-filter" data-tag="electrical engineering"><i class="fa-solid fa-hashtag"></i> Electrical Engineering</button>
        <button class="tag-filter" data-tag="chemistry"><i class="fa-solid fa-hashtag"></i> Chemistry</button>
        <button class="tag-filter" data-tag="mycology"><i class="fa-solid fa-hashtag"></i> Mycology</button>
        <button class="tag-filter" data-tag="hv"><i class="fa-solid fa-hashtag"></i> High Voltage</button>
        <button class="tag-filter" data-tag="3d printing"><i class="fa-solid fa-hashtag"></i> 3D Printing</button>
        <button class="tag-filter" data-tag="biohacking"><i class="fa-solid fa-hashtag"></i> Biohacking</button>
        <button class="tag-filter" data-tag="pcb design"><i class="fa-solid fa-hashtag"></i> PCB Design</button>
      </div>
      <!-- Extra tags, hidden by default -->
      <div class="extra-tags" style="display: none;">
        <button class="tag-filter" data-tag="electronics"><i class="fa-solid fa-hashtag"></i> Electronics</button>
        <button class="tag-filter" data-tag="biology"><i class="fa-solid fa-hashtag"></i> Biology</button>
        <button class="tag-filter" data-tag="cnc"><i class="fa-solid fa-hashtag"></i> CNC</button>
        <button class="tag-filter" data-tag="laser"><i class="fa-solid fa-hashtag"></i> Laser</button>
        <button class="tag-filter" data-tag="implants"><i class="fa-solid fa-hashtag"></i> Implants</button>
        <button class="tag-filter" data-tag="nfc"><i class="fa-solid fa-hashtag"></i> NFC</button>
        <button class="tag-filter" data-tag="attiny"><i class="fa-solid fa-hashtag"></i> ATTiny</button>
        <button class="tag-filter" data-tag="samd21"><i class="fa-solid fa-hashtag"></i> SAMD21</button>
        <button class="tag-filter" data-tag="fusion360"><i class="fa-solid fa-hashtag"></i> Fusion360</button>
        <button class="tag-filter" data-tag="supercaps"><i class="fa-solid fa-hashtag"></i> Supercaps</button>
        <button class="tag-filter" data-tag="thermal cam"><i class="fa-solid fa-hashtag"></i> Thermal Cam</button>
        <button class="tag-filter" data-tag="terrarium"><i class="fa-solid fa-hashtag"></i> Terrarium</button>
        <button class="tag-filter" data-tag="distillation"><i class="fa-solid fa-hashtag"></i> Distillation</button>
      </div>
  </div>
</div>

<!-- _pages/gallery.md -->
<div class="gallery">
  <div class="container">
    <div class="row cards-container grid">
      <div class="col-md-3 card-item grid-item " data-tags="featured, hv, electrical engineering, electronics, systemantics, video">
        <div class="card mb-4 shadow-sm">
            {% include video.liquid path="assets/video/WardSGTC.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">MASSIVE spark gap tesla coil at LOD labs</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="featured, hv, electrical engineering, electronics, systemantics, video">
        <div class="card mb-4 shadow-sm">
            {% include video.liquid path="assets/video/wirelessbike.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">Wirelessly powered capacitively coupled wireless bike at LOD labs</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="electrical engineering, electronics, systemantics">
        <div class="card mb-4 shadow-sm">
            {% include figure.liquid  loading="lazy" path="assets/img/Gallery/nonhumanscent.png" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://github.com/eigenlucy/nonhumanscent">nonhumanscent</a>, ML-assisted gas composition sensing with BME688 and ESP32S3</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/micrompptv3.png" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://github.com/eigenlucy/micromppt">Micromppt V3</a></p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/txpowertest.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://hackaday.io/project/202604-femtofox-pro-tx-power-power-consumption-testing">Femtofox/E22-900M30S TX Power Testing</a></p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/HABLaunch.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://www.noisebridge.net/wiki/Spacebridge">Spacebridge HAB Launch</a></p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/femtofoxgroundstation.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://github.com/femtofox/femtofox">Femtofox Based Ground Station</a></p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/openflashlightpcb.png" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://hackaday.io/project/202611-openflashlight">OpenFlashlight</a></p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="biology, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/dinoflagellete.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">Dinoflagelletes cell</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="featured, electrical engineering, electronics, systemantics, video">
        <div class="card mb-4 shadow-sm">
            {% include video.liquid path="assets/img/Gallery/scintillatorcrystal.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">Gallium aluminum garnet scintilator crystals</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="featured, electronics, systemantics, video">
        <div class="card mb-4 shadow-sm">
            {% include video.liquid path="assets/video/laser.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">200W UV laser diode lighting a log on fire without a lens</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="chemistry, distillation, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/DiethylEtherHeptaneExtraction.JPEG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">short path distillation setup</p>
              <div class="d-flex justify-content-between align-items-center">
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="chemistry, distillation, video">
        <div class="card mb-4 shadow-sm">
          {% include video.liquid path="assets/video/distillationapparatus.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">fractional distillation + condensor column</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="chemistry, distillation, thermal camera, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/distillationthermalcam.JPG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">fractional distillation setup (thermal camera)</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, attiny, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/OpenFlashLightRender.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://github.com/eigenlucy/uv-lamp">Open Flashlight</a> PCB Rendering</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, attiny, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/izzymonitor.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://eigenlucy.github.io/projects/izzymonitor">Izzymonitor</a> HAOS panel</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/micromppt.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text"><a href="https://eigenlucy.github.io/projects/micromppt/">MicroMPPT</a> test board</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="chemistry, distillation, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/DiethylEther.JPEG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">diethyl ether extracted from starting fluid</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="mycology, oyster mushrooms, biology, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/PinkOysterJar.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">Brain jar🧠 (pink oyster rye berry grain spawn jar)</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, attiny, fusion360, electrical engineering, electronics, supercaps, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/SupercapBackup2ngGenRENDER.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">rendering of the LTC3350 supercap bidirectional converter PCB</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, attiny, electronics, supercaps, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/SupercapBackup2ngGenAssebled.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">holding the first bidirectional converter prototype I assembled :)</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="hv, electrical engineering, electronics, video">
        <div class="card mb-4 shadow-sm">
            {% include video.liquid path="assets/video/MOT.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">microwave oven transformer (MOT) arc</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="featured, hv, samd21, electrical engineering, electronics, systemantics, video">
        <div class="card mb-4 shadow-sm">
            {% include video.liquid path="assets/video/ignitioncoilnokia.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">IGBT singing ignition coil playing a nokia ring tone</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="hv, samd21, electrical engineering, electronics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/MusicalIgnitionCoil.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">this is an ignition coil driven by an IGBT half bridge by an arduino designed to play music on a jacob's ladder. here it is producing a heart around 20khz</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="mycology, biology, grain spawn, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/LionsMane.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">this is a lion's mane that has begun to fruit in the grain spawn jar</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, attiny, cnc, fusion360, electrical engineering, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/PowerUsageTrackerATtiny.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">attiny1627 (2-Series) based power usage tracker made to observe a power spike associated with a randomly triggered GSM module activation on a hydrogen gas meter. milled on an LPFK protomat.</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, attiny, electrical engineering, electronics, supercaps, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/SupercapBackupPrizmacapTop.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">LTC3110 based bidirectional converter with attiny1627 uC. produced in the process of testing kyocera-AVX prismatic caps for a variety of applications</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electrical engineering, electronics, supercaps, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/SupercapBackupPrizmacapBottom.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">underside of the LTC3110 PCB. off-the-shelf RF cans secure two prismatic caps securing and provide some protection. produced a version with a lower profile solid aluminum can in the same style</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="hv, electrical engineering, video">
        <div class="card mb-4 shadow-sm">
            {% include video.liquid loading="lazy" path="assets/video/VoltageMultiplier.mp4" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">voltage multiplier with ~100kV output</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="electrical engineering, electronics opensauce, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/Nema23CrankGenerator.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">NEMA23 stepper motor converter to a crank generator supercap charger</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="3d printing, terrarium, biology, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/EggPrinting.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">printing an an egg as a basking spot for one of my snakes with an MSLA resin 3D printer. she LOVES it</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="biology, 3d printing, terrarium, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/MarcelleEgg.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">this is marcelle the red tail boa basking on her egg :) she's quite the hermeticist</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="electronics, electronics engineering, leds, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/POVglobe.JPG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">this is a POV globe made from an addressable LED strip and random brushless motor. the wood frame was a poor choice</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="electroplating, 3d printing, chemistry, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/nietzscheplating.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">coating an mSLA printed part in a polyurethane/copper nanoparticle based conductive coating to prep for electroplating</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="electroplating, chemistry, 3d printing, video">
      <div class="col-md-3 card-item grid-item " data-tags="electroplating, chemistry, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/electroplatingbath.JPG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">electroplating setup where copper (CuSO4 + sulfuric acid + brightener solution) is deposited on the printed piece</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="electroplating, chemistry, 3d printing, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/platednietzsche.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">mSLA resin printed part after an electroplating procedure</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="systemantics, Simondon, individuation, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/individuation.png" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">individuation of the technical object ;)</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electronics, electrical engineering, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/izzymonitorback.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">ROZ Wild Robot Back Silkscreen</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="mycology, biology, agar plates, liquid culture, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/PS_LC.JPEG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">panellus stipticus liquid culture</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="electronics, electrical engraving, hv, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/DRSSTCTesting.JPEG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">testing a DRSSTC driver</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electronics, electrical engineering, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/FLCLpcb.JPG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">guitar pedal PCB with a FLCL graphic</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, electronics, electrical engineering, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/TheOwlsAreNotWhatTheySeem.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">The Owls Are Not What They Seem</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="mycology, biology, spawn bag, oyster mushrooms, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/ShroomTank.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">golden oyster mushrooms taking over a tank of mulch</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="electrical engineering, electronics, equipment, oscilloscope, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/OsciliscopeWithCouplingError.JPG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">dead analog oscilloscope running with the hood off</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="mycology, biology, grain spawn, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/PressureCooking.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">loading up a pressure cooker with grain spawn jars to sterilize them for inoculation</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="biology, grain spawn, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/CCLplants.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">Greenhouse at Counter Culture Labs</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="laser, cnc, woodworking, systemantics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/TableEngraving.JPG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">laser engraving a table my roommate and I built (image from Deleuze and Guattari's A Thousand Plateaus)</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="3d printing, biology, systematics, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/MarcelleDreammachine.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">Marcelle on a 3D printed recreation of William Burroughs' Dreamachine</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="chemistry, electroplating, video">
        <div class="card mb-4 shadow-sm">
          {% include video.liquid path="assets/video/sulfuricacidCUSO4.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">Addition of of concentrated sulfuric acid to CUSO4 based electroplating solution</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="mycology, biology, grain spawn, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/PressureCooking2.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">using a pressure cooker as an autoclave for spawn bag sterilization</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="diy, biology, chemistry, 3d printing, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/DIYStirplate.JPG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">DIY stirplate with a computer fan and printed parts</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="mycology, agar plates, biology, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/AgarPlates.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">Agar/LME spore plates</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="pcb design, prototyping, electrical engineering, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/LostConveyerBelt.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">sad PCB lost in the reflow conveyer belt :((</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="laser, cnc, woodworking, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/Engraving.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">playing with digital art/laser engraving. the snakeskin pattern on the wood comes from the grain on the sycamore.</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="implants, biohacking, nfc, video">
        <div class="card mb-4 shadow-sm">
          {% include video.liquid path="assets/video/ImplantProcedureVideo.mp4" class="rounded z-depth-1" type="video/mp4" controls=true %}
          <div class="card-body">
            <p class="card-text">xSIID self implant procedure</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="implants, nfc, electrical engineering, biohacking, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/NFCimplant.png" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">LED visible in daylight after some healing</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="terrarium, isopods, biology, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/BioactiveTankConstructionLayingOut.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">building a bioactive enclosure for my ball python Basil. made with gorilla glue, spray foam, DIY tropical ABG mix, and terrafirma</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="terrarium, biology, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/BasilTankComplete.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">completed bioactive setup for Basil :)</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="implants, biohacking, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/ImplantSurgery.PNG" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">DIY magnet implant surgery. gave myself lidocaine injections in the base of my finger, cut a pocket, and inserted a parylene c coated neodymium magnet.</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3 card-item grid-item " data-tags="isopods, biology, terrarium, image">
        <div class="card mb-4 shadow-sm">
          {% include figure.liquid  loading="lazy" path="assets/img/Gallery/ZebraIsopodTerrarium.jpg" class="img-fluid rounded z-depth-1" %}
          <div class="card-body">
            <p class="card-text">zebra isopod terrarium setup</p>
            <div class="d-flex justify-content-between align-items-center">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
