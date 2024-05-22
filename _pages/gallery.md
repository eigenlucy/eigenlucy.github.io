---
layout: page
permalink: /gallery/
title: gallery
description: an assortment of project photos 
nav: true
nav_order: 1
---

<div class="tag-filter-container">
  <button class="tag-filter" data-tag="all">All</button>
  <button class="tag-filter" data-tag="image">image</button>
  <button class="tag-filter" data-tag="video">video</button>
  <button class="tag-filter" data-tag="electrical engineering">electrical engineering</button>  
  <button class="tag-filter" data-tag="electronics">electronics</button>
  <button class="tag-filter" data-tag="chemistry">chemistry</button>
  <button class="tag-filter" data-tag="hv">hv</button>
  <button class="tag-filter" data-tag="mycology">mycology</button>
  <button class="tag-filter" data-tag="biology">biology</button>
  <button class="tag-filter" data-tag="cnc">CNC</button>
  <button class="tag-filter" data-tag="laser">laser</button>
  <button class="tag-filter" data-tag="biohacking">biohacking</button>
  <button class="tag-filter" data-tag="implants">implants</button>
  <button class="tag-filter" data-tag="pcb design">PCB design</button>
  <button class="tag-filter" data-tag="3d printing">3D printing</button>
  <button class="tag-filter" data-tag="nfc">nfc</button>
  <button class="tag-filter" data-tag="samd21">samd21</button>
  <button class="tag-filter" data-tag="fusion360">fusion360</button>
  <button class="tag-filter" data-tag="supercaps">supercaps</button>
  <button class="tag-filter" data-tag="thermal cam">thermal cam</button>
  <button class="tag-filter" data-tag="terrarium">terrarium</button>
  <button class="tag-filter" data-tag="distillation">distillation</button>
</div>

<!-- _pages/gallery.md -->
<div class="gallery">
 <div class="container">
 <div class="cards-container">
  <div class="row">

  <div class="col-md-4 card-item" data-tags="chemistry, distillation, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/DiethylEtherHeptaneExtraction.JPEG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">short path distillation setup</p>
           <div class="d-flex justify-content-between align-items-center">
           </div>
         </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="chemistry, distillation, video">
    <div class="card mb-4 shadow-sm">
      {% include video.liquid loading="eager" path="assets/video/distillationapparatus.mp4" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true %}
      <div class="card-body">
        <p class="card-text">fractional distillation + condensor column</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>
     
  <div class="col-md-4 card-item" data-tags="chemistry, distillation, thermal camera, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/distillationthermalcam.JPG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">fractional distillation setup (thermal camera)</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="chemistry, distillation, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/DiethylEther.JPEG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">diethyl ether extracted from starting fluid</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="mycology, oyster mushrooms, biology, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/PinkOysterJar.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">Brain jar🧠 (pink oyster rye berry grain spawn jar)</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="pcb design, fusion360, supercaps, electrical engineering, electronics, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/SupercapBackup2ngGenCAD.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">draft PCB design in Fusion360 for an LTC3350 based bidirectional converter supercap backup system. this circuit contains the LTC3550 bidirectional converter driver, the corresponding DC-DC converter circuitry, an attiny 1627 uC, and a half bridge driver. designed to AEC standards while exploring the use of supercaps for automotive e-latch drivers</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="pcb design, fusion360, electrical engineering, electronics, supercaps, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/SupercapBackup2ngGenRENDER.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">rendering of the LTC3350 supercap bidirectional converter PCB</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="pcb design, electrical engineering, electronics, supercaps, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/SupercapBackup2ngGenAssebled.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">holding the first bidirectional converter prototype I assembled :)</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="hv, electrical engineering, electronics, video">
    <div class="card mb-4 shadow-sm">
         {% include video.liquid loading="eager" path="assets/video/MOT.mp4" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true %}
      <div class="card-body">
        <p class="card-text">microwave oven transformer (MOT) arc</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="hv, samd21, electrical engineering, electronics, systemantics, video">
    <div class="card mb-4 shadow-sm">
         {% include video.liquid loading="eager" path="assets/video/ignitioncoilnokia.mp4" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true %}
      <div class="card-body">
        <p class="card-text">IGBT singing ignition coil playing a nokia ring tone</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="hv, samd21, electrical engineering, electronics, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/MusicalIgnitionCoil.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">this is an ignition coil driven by an IGBT half bridge by an arduino designed to play music on a jacob's ladder. here it is producing a heart around 20khz</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="mycology, biology, grain spawn, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/LionsMane.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">this is a lion's mane that has begun to fruit in the grain spawn jar</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="pcb design, attiny, supercaps, electrical engineering, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/PowerUsageTrackerATtiny.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">attiny1627 (2-Series) based power usage tracker made to observe a power spike associated with a randomly triggered GSM module activation on a hydrogen gas meter. milled on an LPFK protomat.</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="pcb design, attiny, electrical engineering, electronics, supercaps, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/SupercapBackupPrizmacapTop.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">LTC3110 based bidirectional converter with attiny1627 uC. produced in the process of testing kyocera-AVX prismatic caps for a variety of applications</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="pcb design, electrical engineering, electronics, supercaps, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/SupercapBackupPrizmacapBottom.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">underside of the LTC3110 PCB. off-the-shelf RF cans secure two prismatic caps securing and provide some protection. produced a version with a lower profile solid aluminum can in the same style</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="hv, electrical engineering, video">
    <div class="card mb-4 shadow-sm">
      {% include video.liquid loading="eager" path="assets/video/VoltageMultiplier.mp4" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true %}
      <div class="card-body">
        <p class="card-text">voltage multiplier with ~100kV output</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="opensauce, 3d printing, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/SupercapCrankGeneratorPrintedParts.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">Printed parts to convert a NEMA23 stepper motor into a hand crank generator</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="electrical engineering, electronics opensauce, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/Nema23CrankGenerator.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">NEMA23 stepper motor converter to a crank generator supercap charger</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="3d printing, terrarium, biology, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/EggPrinting.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">printing an an egg as a basking spot for one of my snakes with an MSLA resin 3D printer. she LOVES it</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="biology, 3d printing, terrarium, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/MarcelleEgg.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">this is marcelle the red tail boa basking on her egg :) she's quite the hermeticist</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="electronics, electronics engineering, leds, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/POVglobe.JPG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">this is a POV globe made from an addressable LED strip and random brushless motor. the wood frame was a poor choice</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="electroplating, 3d printing, chemistry image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/nietzscheplating.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">coating an mSLA printed part in a polyurethane/copper nanoparticle based conductive coating to prep for electroplating</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md- card-item" data-tags="electroplating, chemistry, 3d printing, video">
    <div class="card mb-4 shadow-sm">
         {% include video.liquid loading="eager" path="assets/video/airbrushcopperapplication.mp4" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true %}
      <div class="card-body">
        <p class="card-text">Airbrushing conductive copper nanoparticle paint onto a printed part to prep for plating</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="electroplating, chemistry, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/electroplatingbath.JPG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">electroplating setup where copper (CuSO4 + sulfuric acid + brightener solution) is deposited on the printed piece</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="electroplating, chemistry, 3d printing, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/platednietzsche.png" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">mSLA resin printed part after an electroplating procedure</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="systemantics, Simondon, individuation, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/individuation.png" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">individuation of the technical object ;)</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>



  <div class="col-md-4 card-item" data-tags="mycology, biology, agar plates, liquid culture, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/PS_LC.JPEG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">panellus stipticus liquid culture</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="electronics, electrical engraving, hv, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/DRSSTCTesting.JPEG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">testing a DRSSTC driver</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="pcb design, electronics, electrical engineering, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/FLCLpcb.JPG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">guitar pedal PCB with a FLCL graphic</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="mycology, biology, spawn bag, oyster mushrooms, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/ShroomTank.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">golden oyster mushrooms taking over a tank of mulch</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="electrical engineering, electronics, equipment, oscilloscope, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/OsciliscopeWithCouplingError.JPG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">dead analog oscilloscope running with the hood off</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="mycology, biology, grain spawn, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/PressureCooking.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">loading up a pressure cooker with grain spawn jars to sterilize them for inoculation</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="laser, cnc, woodworking, systemantics, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/TableEngraving.JPG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">laser engraving a table my roommate and I built (image from Deleuze and Guattari's A Thousand Plateaus)</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="3d printing, biology, systematics, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/MarcelleDreammachine.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">Marcelle on a 3D printed recreation of William Burroughs' Dreamachine</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="mycology, biology, grain spawn, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/PressureCooking2.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">using a pressure cooker as an autoclave for spawn bag sterilization</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="diy, biology, chemistry, 3d printing, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/DIYStirplate.JPG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">DIY stirplate with a computer fan and printed parts</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="mycology, agar plates, biology, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/AgarPlates.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">Agar/LME spore plates</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="pcb design, prototyping, electrical engineering, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/LostConveyerBelt.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">sad PCB lost in the reflow conveyer belt :((</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="laser, cnc, woodworking, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/Engraving.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">playing with digital art/laser engraving. the snakeskin pattern on the wood comes from the grain on the sycamore.</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="implants, biohacking, nfc, video">
    <div class="card mb-4 shadow-sm">
      {% include video.liquid loading="eager" path="assets/video/ImplantProcedureVideo.mp4" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true %}
      <div class="card-body">
        <p class="card-text">xSIID self implant procedure</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="implants, biohacking, nfc, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/ImplantMissionAccomplished.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">just after injecting my dangerous things xsiid NFC/LED chip into my hand.</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="implants, nfc, electrical engineering, biohacking, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/NFCimplant.png" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">LED visible in daylight after some healing</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="terrarium, isopods, biology, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/BioactiveTankConstructionLayingOut.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">building a bioactive enclosure for my ball python Basil. made with gorilla glue, spray foam, DIY tropical ABG mix, and terrafirma</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="terrarium, biology, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/BasilTankComplete.jpg" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">completed bioactive setup for Basil :)</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="implants, biology, biohacking, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/ImplantSurgery.PNG" class="img-fluid rounded z-depth-1" %}
      <div class="card-body">
        <p class="card-text">DIY magnet implant surgery. gave myself lidocaine injections in the base of my finger, cut a pocket, and inserted a parylene c coated neodymium magnet.</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="implants, systemantics, biohacking, video">
    <div class="card mb-4 shadow-sm">
         {% include video.liquid loading="eager" path="assets/video/ImplantProcedureVideo.mp4" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true %}
      <div class="card-body">
        <p class="card-text">xSIID self implant procedure in my kitchen</p>
        <div class="d-flex justify-content-between align-items-center">
        </div>
      </div>
    </div>
  </div>

  <div class="col-md-4 card-item" data-tags="isopods, biology, terrarium, image">
    <div class="card mb-4 shadow-sm">
      {% include figure.liquid loading="eager" path="assets/img/Gallery/ZebraIsopodTerrarium.jpg" class="img-fluid rounded z-depth-1" %}
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
</div>
