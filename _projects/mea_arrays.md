---
layout: page
title: Microelectrode Arrays
description: Constructing microelectrode arrays for cultured neurons for Frontier Tower's Neurotech floor
img: assets/img/Gallery/MEA_Array_Test.jpeg
importance: 1
category: biology
related_publications: false
---
Recently, I have been doing a lot of work on biotech hardware with my good friend and collaborator <a href="https://yoyo.cat">Yoyo</a>. It started off with research into the feasibility of custom electrochemical sensor arrays for <a href="https://eigenlucy.com/projects/nonhumanscent">NonHumanScent</a>. The estimates I got were absolutely silly. So I started looking into making my own arrays. There are a number of techniques utilizing laser induced graphene (<a href="https://www.nature.com/articles/ncomms6714">LIG</a>) for maskless array fabrication. I read <a href="https://www.nature.com/articles/s41528-018-0047-8">this paper</a> on LIG for urea sensors, where the chemical affinity of the resulting thin film sensor can be adjusted by manipulating the atmosphere in which you do the patterning so as to induce electrically responsive vacancies in the surface of the graphene, and started playing around with the tek more. As we researched more and more into the diversity of bioloigical olfactory receptor neurons (ORNs), we became more and more interested in culturing ourseves some neurons. Luckily, we have some friends in <a href="https://frontiertower.io">Frontier Tower</a>'s neurotech group, who were very interested in trading experience with mammalian cell cultures for experience with fabrication and electronics. So, we agreed to start working on fabricating a system for cultured neurons for them, based on the work we were already doing with LIG arrays.

<div>
  <img src="/assets/img/Gallery/LIG_Demo.webp" alt="LIG SEM Images" style="width: 50%; height: auto; display: block; margin-left: auto; margin-right: auto;">
</div>
SEM images of pourous graphene on polyimide


We are starting with a system titled Mind In Vitro (MIV), an open source headstage platform developed by a <a href-="https://mindinvitro.illinois.edu">team at University of Illinois</a>.

We will be making a number of modifications to this system. For one, we are attempting an entirely maskless MEA fabrication process which removes the need for spin coating. Our plan is to first deposit gold or titanium (need to test to determine which is better) onto polymide tape via atomic layer deposition with sputtering. We'll then selective ablate the Ti/Au from the surface leaving behind the electrodes and pogo pin contactsn using our <a href="https://www.cloudraylaser.com/collections/mp-series">Cloudray</a> MOPA 60W 1064nm DPSS laser. Then, we use our <a href="https://www.xtool.com/products/xtool-p2-55w-co2-laser-cutter">Xtool</a> 55W C02 laser to add laser induced graphene wires connecting the electrodes to pogo pin contacts. We need two different kinds of deposits so that our electrodes are capturing signals from a well localized area of neurons. The consistency of graphene conductivity will be crucial to signal integrity.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/MEA_Array_Test.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/MIV_Headstage.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
<div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Gallery/MIV_Frame.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

To start, we are going to be using <a href="https://intantech.com/RHD_headstages.html">RHD headstages</a> for signal acquistion. These are INSANELY overpriced. For a sense of just how overpriced they are, each connector costs around $180, and we need 1 for each set of 32 electrodes. There is nothing special about them, I promise. We call this BIOTAX, and it is the bane of free and open source bio. We are going to get a system working with the classic Intan setup, then begin working on some DIY EEG ADCs and acquisition units. We have already gotten some really great advice on some suitable simultaneously samnpling high res ADCs from the folks at Backyard Brains. This will be a lot of fun to play more with.

We have begun fabricating the Mind In Vitro open hardware with the help of this <a href="https://github.com/GazzolaLab/MiV-OH">repo</a>. As we go through it, we've been tweaking things like connectors and schematic layout to make the system cheaper and easier to modify. I'll dump everything in a repo once I get them all finalized.

We are working on two methods of fabricating the high conductivity electrodes. We are going to try using my desktop sputtering system to deposit Ti or Au in a thin film onto our polymide, then ablating off that metal with the DPSS to leave only fidicuals and our electrodes/pogo pin contacts. Then, we can have the camera in our C02 laser align to the fidicuals and draw the pourous graphene. We are also investigating screen printing electrodes onto the surface of the polymide. As painful as this will be, particularly the alignment after the fact, this is all so much cheaper and easier than traditional photolithography methods. 

We may alsio be able to bypass the alignment issues by doing everything on one laser, as MOPA pulse shaping allows us to shoot through polymide and ablate/vaporize metals underneath.
We discovered this whilst playing around with laser induced physical vapor desposition, with sick results!

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid loading="eager" path="assets/img/Gallery/co2_laser.mp4" title="" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true%}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid loading="eager" path="assets/img/Gallery/polymide_dpss.mp4" title="" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true%}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid loading="eager" path="assets/img/Gallery/PVD.mp4" title="" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true%}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid loading="eager" path="assets/img/Gallery/PVD_conductivity.mp4" title="" class="img-fluid rounded z-depth-1" type="video/mp4" controls=true%}
    </div>
</div>
