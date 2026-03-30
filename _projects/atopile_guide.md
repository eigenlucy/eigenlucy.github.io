---
layout: page
title: Intro to Atopile
description: Installation, usage, and best-practices
img: assets/img/Gallery/atopile.jpg
importance: 5
category: electrical engineering
tags: [electrical engineering, pcb-design]
related_publications: false
giscus_comments: true
toc:
  sidebar: left
---

Over the last year, I've spent a lot of time using [Atopile](https://atopile.io) for my PCB designs. It's a code-first EDA tool — you describe circuits in `.ato` files (a Python-inspired DSL), and the compiler handles component selection, constraint validation, and KiCad project generation. See the [atopile docs](https://docs.atopile.io/atopile/introduction) for the full reference. This page covers the language fundamentals and my install/build workflow.

Example projects to reference alongside this guide:
- [eigenlucy/ncp1529asnt1g](https://github.com/eigenlucy/ncp1529asnt1g) — a reusable NCP1529 buck converter package
- [eigenlucy/wasp](https://github.com/eigenlucy/wasp) — a BLE wearable that imports the NCP1529 package

# Atopile Usage 101

## The .ato Language

Atopile uses an indentation-based syntax (like Python). Comments start with `#`.

### Types

| Type | Description |
|------|-------------|
| `module` | Container for signals, variables, and connections. The fundamental building block. |
| `component` | Subclass of module representing a physical part on the PCB. Has footprint/symbol/BOM data. |
| `interface` | Connection point type (e.g., `Electrical`, `ElectricPower`, `I2C`). |
| `signal` | Named electrical connection within a component. |
| `pin` | Physical pad on a footprint. |

You can subclass a module as a component, but NOT a component as a module.

### Modules and Inheritance

```
module SomeModule:
    some_signal = new ElectricSignal
    gnd = new Electrical
    some_signal.reference.lv ~ gnd
    some_variable = "some value"

# Inherit with the 'from' keyword
module SubclassedModule from SomeModule:
    some_variable = "overridden value"
```

Instantiation uses the `new` keyword. Attributes are assigned directly in scope.

### Units and Tolerances

Units are written immediately after numbers with no space:

```
1.23ohm       # or 1.23Ω
4.56Kohm      # kilohms
100nF         # nanofarads
4.7uF         # microfarads
3.3V          # volts
600mV         # millivolts
18pF          # picofarads
2.2uH         # microhenries
400kHz        # kilohertz
```

Three tolerance forms:

```
1V to 2V                  # range
3uF +/- 1uF              # absolute
4Kohm +/- 1%             # percentage
```

### Connections

The `~` operator connects interfaces of the same type:

```
power.hv ~ r_top.p1
r_top.p2 ~ output.line
```

Multiple connections can be chained with semicolons on one line:

```
Vout.gnd ~ Vin.gnd; ic.GND ~ Vin.gnd
```

### Imports

```
# Standard library (no path needed)
import Resistor, Capacitor, ElectricPower, ElectricSignal

# From a local file in the same project
from "ncp1529asnt1g.ato" import NCP1529ASNT1G

# From an installed package dependency
from "eigenlucy/ncp1529asnt1g/main.ato" import Regulator
```

Paths are relative to the project root (where `ato.yaml` lives). The legacy `import X from "file.ato"` syntax is deprecated.

## Writing Interfaces

Interfaces define the connection contract for a module — what signals it exposes and how they relate. The standard library provides the common ones, but understanding how they're built helps you write your own.

### Standard Library Interfaces

**`Electrical`** — a single electrical net. The most fundamental interface, no sub-signals.

**`ElectricPower`** — a power rail:
- `hv` / `vcc` (Electrical) — high voltage
- `lv` / `gnd` (Electrical) — ground
- Parameters: `voltage` (volt), `max_current` (ampere)

**`ElectricSignal`** — a signal referenced to a power rail:
- `line` (Electrical) — the signal line
- `reference` (ElectricPower) — defines the voltage domain

**`ElectricLogic`** — a two-state logic signal:
- `line` (Electrical) — the logic line
- `reference` (ElectricPower) — voltage reference
- Parameter: `push_pull` (dimensionless)

**`I2C`** — `scl`, `sda` (ElectricLogic), `frequency`, `address` parameters. Has `requires_pulls` trait (needs pull-up resistors).

**`SPI`** — `miso`, `mosi`, `sclk` (ElectricLogic).

**`UART`** — `base_uart` (UART_Base), plus flow control signals (`cts`, `rts`, etc.).

Others: `USB2_0`, `USB_C`, `HDMI`, `CAN`, `JTAG`, `SWD`, `DifferentialPair`, etc.

### Writing Custom Interfaces

If your IC has a non-standard bus or you want to group signals semantically, define your own interface:

```
interface MyBus:
    clk = new Electrical
    data = new Electrical
    reference = new ElectricPower
```

Then use it in modules and connect with `~` — the compiler ensures both sides have matching structure.

## Workflow: From Datasheet to Reusable Package

This is the full pipeline for turning an IC into a reusable atopile package, using the NCP1529 buck converter as a worked example.

### Step 1: Define the component — map pins to signals

Start from the datasheet. The NCP1529ASNT1G has 5 pins. Create a component definition that maps each physical pin to a named signal:

```
component NCP1529ASNT1G:
    """onsemi NCP1529ASNT1G buck converter"""
    lcsc_id = "C23902"
    manufacturer = "onsemi"
    mpn = "NCP1529ASNT1G"
    datasheet_url = "https://..."
    designator_prefix = "U"

    # Map signals to physical pins
    signal EN ~ pin 1
    signal GND ~ pin 2
    signal SW ~ pin 3
    signal VIN ~ pin 4
    signal FB ~ pin 5
```

You can also generate this with `ato create part` by entering the JLCPCB part number (C23902). It auto-generates the component definition with traits, pin mappings, footprint, symbol, and 3D model.

Key attributes: `lcsc_id` (JLCPCB part number), `manufacturer`, `mpn`, `designator_prefix` (U, R, C, L, etc.), `package` (e.g. "0402", "SOT-23").

### Step 2: Construct the circuit — connect interfaces and components

Now wrap the IC in a module with the required external components (caps, inductors, resistor divider) and expose standard interfaces (`ElectricPower`) for other modules to connect to. This is where the circuit design lives:

```
import Capacitor, Resistor, ElectricPower, Inductor
from "ncp1529asnt1g.ato" import NCP1529ASNT1G
from "swpa3015s2r2nt.ato" import SWPA3015S2R2NT

module Regulator:
    ic = new NCP1529ASNT1G
    L = new SWPA3015S2R2NT    # 2.2uH inductor

    # Expose standard power interfaces
    Vin = new ElectricPower
    Vout = new ElectricPower
    Vout.gnd ~ Vin.gnd; ic.GND ~ Vin.gnd

    # Input decoupling cap
    Cin = new Capacitor; Cin.value = 4.7uF +/- 20%; Cin.package = "C0603"
    Cin.power ~ Vin; Vin.vcc ~ ic.VIN

    # Output cap
    Cout = new Capacitor; Cout.value = 10uF +/- 20%; Cout.package = "C0603"
    Cout.power ~ Vout

    # Inductor on the switch node
    ic.SW ~ L.p1; L.p2 ~ Vout.vcc

    # Feedback voltage divider
    Rtop = new Resistor; Rtop.package = "R0402"
    Rbottom = new Resistor; Rbottom.package = "R0402"
    Rbottom.resistance = 200kohm +/- 20%

    Rtop.p1 ~ Vout.vcc; Rtop.p2 ~ ic.FB
    ic.FB ~ Rbottom.p1; Rbottom.p2 ~ Vout.gnd

    # Feedforward cap across Rtop
    Cfl = new Capacitor; Cfl.value = 18pF +/- 20%; Cfl.package = "C0402"
    Cfl.p1 ~ Rtop.p1; Cfl.p2 ~ Rtop.p2
```

Notice the pattern: you instantiate the IC and passives, wire everything together with `~`, and expose `Vin`/`Vout` as the module's public interfaces. Anyone importing this module only needs to connect those power interfaces and set the configurable assertions — the internal circuit is encapsulated.

### Step 3: Add assertions for configurable parameters

This is what makes the package reusable. Declare typed variables for the parameters a user should configure, add assertions to bound them to the IC's valid range, and write the equation that ties them to component values:

```
    ## ASSERTIONS ##
    Vfb = 600mV                        # IC internal reference

    INPUT_VOLTAGE: voltage
    VIN_MIN = 2.7V; VIN_MAX = 5.5V
    assert INPUT_VOLTAGE < VIN_MAX
    assert INPUT_VOLTAGE > VIN_MIN

    OUTPUT_VOLTAGE: voltage
    VOUT_MIN = 900mV; VOUT_MAX = 3.9V
    assert OUTPUT_VOLTAGE < VOUT_MAX
    assert OUTPUT_VOLTAGE > VOUT_MIN

    # The key equation: compute Rtop from desired Vout
    Rtop.resistance = ((OUTPUT_VOLTAGE / Vfb) - 1) * Rbottom.resistance
```

When someone sets `OUTPUT_VOLTAGE = 3.3V`, the compiler solves for `Rtop.resistance = ((3.3V / 0.6V) - 1) * 200kohm = 900kohm`, then auto-picks a resistor from JLCPCB that falls within tolerance. If `OUTPUT_VOLTAGE` is set outside the 900mV–3.9V range, the build fails with an assertion error.

Available dimension types for typed variables: `voltage`, `current`, `resistance`, `capacitance`, `inductance`, `frequency`, `power`, `dimensionless`.

### Step 4: Publish the package

Set up `ato.yaml` with the package metadata and entry point:

```yaml
requires-atopile: ">=0.6.0"

paths:
  src: ./
  layout: ./layouts
  footprints: ./footprints

builds:
  default:
    entry: main.ato:Regulator

package:
  identifier: eigenlucy/ncp1529asnt1g
  repository: https://github.com/eigenlucy/ncp1529asnt1g
  version: "0.1.0"
  authors:
    - name: lucy moglia
      email: eigenlucy@proton.me
  summary: 900mV-3.9Vout DC-DC Converter
  license: GNU General Public License v3
```

### Step 5: Import into another project

In the WASP project, the NCP1529 regulator package is added as a dependency and configured with a single line to set the output voltage:

```yaml
# wasp ato.yaml (excerpt)
dependencies:
- type: registry
  identifier: eigenlucy/ncp1529asnt1g
  release: 0.1.2
```

```
# wasp main.ato
from "eigenlucy/ncp1529asnt1g/main.ato" import Regulator

module Wasp:
    power_batt = new ElectricPower
    power_3V3 = new ElectricPower
    power_batt.gnd ~ power_3V3.gnd

    # Instantiate the regulator and set output voltage
    ldo = new Regulator
    ldo.OUTPUT_VOLTAGE = 3.3V +/- 5%
    ldo.Vin ~ power_batt
    ldo.Vout ~ power_3V3

    # Access internal IC signals when needed (e.g. enable pin)
    ldo.ic.EN ~ uc.gpios[5]
    ldo_pullup = new Resistor
    ldo_pullup.value = 100kohm; ldo_pullup.package = "R0201"
    ldo_pullup.p1 ~ ldo.ic.EN; ldo_pullup.p2 ~ power_3V3.vcc
```

That's the whole flow: `OUTPUT_VOLTAGE = 3.3V +/- 5%` is all it takes to configure the regulator. The compiler propagates that through the feedback divider equation, picks appropriate resistors, and validates everything is within the IC's operating range. If you wanted 1.8V instead, change one line. The assertion system catches invalid configurations at build time.

## Traits and the Bridge Operator

Traits are an experimental feature that extend module behavior. Enable them with pragma directives at the top of your file:

```
#pragma experiment("TRAITS")
```

### The Bridge Operator `~>`

The bridge operator lets you chain a signal through a module without manually wiring both sides. Instead of:

```
input ~ filter.input
filter.output ~ output
```

You write:

```
input ~> filter ~> output
```

To use it, you need **both** pragmas and the trait on the module being bridged:

```
#pragma experiment("TRAITS")
#pragma experiment("BRIDGE_CONNECT")
import can_bridge_by_name

module LowPassFilter:
    input = new ElectricLogic
    output = new ElectricLogic
    trait can_bridge_by_name<input_name="input", output_name="output">

    # ... filter circuit internals ...
```

The `can_bridge_by_name` trait tells the compiler which interfaces are the input and output for bridging. The bridge operator only works on modules that have this trait — it's not a generic passthrough. Typical use cases are filters, level shifters, buffers, and other signal-conditioning modules where you're chaining a signal through a series of processing stages:

```
mic_signal ~> preamp ~> low_pass ~> adc_input
```

Each module in the chain must have the `can_bridge_by_name` trait with its input/output interfaces named.

### Other Useful Traits

**`has_single_electric_reference_shared`** — auto-connects all electric references (power/ground) within a module. Saves you from manually wiring every ground together:

```
module MyBoard:
    logic_a = new ElectricLogic
    logic_b = new ElectricLogic
    power = new ElectricPower
    trait has_single_electric_reference_shared
    # All .reference.lv nets are now connected automatically
```

Use `<gnd_only=true>` to only share ground, not the power rail.

## Key Components (Standard Library)

**Resistor** — `resistance` (ohm), `max_power` (watt). Terminals: `p1`, `p2`. Auto-pickable.

**Capacitor** — `capacitance` / `value` (farad), `max_voltage` (volt). Terminals: `p1`, `p2` or `power` (ElectricPower for bypass caps). Auto-pickable.

**Inductor** — `inductance` (henry), `current` (ampere). Terminals: `p1`, `p2`.

**LED** — `current`, `forward_voltage`, `color`. Terminals: `anode`, `cathode`.

**MOSFET / NFET / PFET** — `gate_source_threshold_voltage`, `max_continuous_drain_current`, `on_resistance`. Terminals: `gate`, `drain`, `source`.

**LDO** — `output_voltage`, `dropout_voltage`, `output_current`. Interfaces: `power_in`, `power_out`, `enable`.

**ResistorVoltageDivider** — `v_in`, `v_out`, `ratio`, `max_current`. Interfaces: `power`, `output`.

For passives, set `package` (e.g. `"0402"`, `"0603"`) and constraints, and the compiler auto-selects from JLCPCB:
```
Cin = new Capacitor; Cin.value = 4.7uF +/- 20%; Cin.package = "C0603"
Rbottom = new Resistor; Rbottom.package = "R0402"; Rbottom.resistance = 200kohm +/- 20%
```

## Adding Components (Four Methods)

**Auto-pick passives** — just set constraints and package. The compiler selects from JLCPCB inventory.

**CLI part creation** — `ato create part`, enter a JLCPCB part number (e.g. C23902) or MPN (e.g. NCP1529ASNT1G). Generates the component definition with traits, pin mappings, footprint, symbol, and 3D model.

**Registry packages** — `ato add atopile/rp2040`, then import. Browse packages at [packages.atopile.io](https://packages.atopile.io/).

**Manual custom parts** — create a folder in `parts/` with KiCad footprint (.kicad_mod), 3D STEP model, and a matching .ato file.

## Packages

```bash
ato add eigenlucy/ncp1529asnt1g    # add a dependency
ato remove eigenlucy/ncp1529asnt1g # remove
ato sync                           # install all from ato.yaml
```

Dependencies appear in `ato.yaml`:

```yaml
dependencies:
- type: registry
  identifier: eigenlucy/ncp1529asnt1g
  release: 0.1.2
- type: registry
  identifier: atopile/usb-connectors
  release: 0.1.0
```

## Project Structure

```
project_name/
├── .ato/                  # dependency cache (gitignored)
├── build/                 # build outputs (gitignored)
├── ato.yaml               # project manifest
├── layouts/               # KiCad board layouts
├── footprints/            # custom footprints (if any)
├── main.ato               # top-level module
└── parts/                 # custom part definitions
    └── my_ic.ato
```

### ato.yaml

Key fields:
- `builds.default.entry` — entry point as `filename.ato:ModuleName`
- `paths.src` — where .ato source files live (often `./`)
- `paths.layout` — where KiCad layout files live
- `dependencies` — list of package dependencies
- `package` — metadata for publishing this project as a package

## Full Example: WASP Main Module

The complete WASP `main.ato` showing how multiple packages and local components come together. The NCP1529 regulator is imported from the registry, configured with one line, and wired to the battery and 3.3V rails:

```
import ElectricPower, USB2_0_IF, Resistor, Capacitor
from "pb03.ato" import PB03
from "atopile/usb-connectors/usb-connectors.ato" import USBCConn
from "atopile/ti-bq2404x/bq2404x.ato" import BQ24045DSQR
from "eigenlucy/ncp1529asnt1g/main.ato" import Regulator
from "lsm6dsltr.ato" import LSM6DSL
from "mmict39020001.ato" import MMICT390200012

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

    # Buck converter — one line to set output voltage
    ldo = new Regulator
    ldo.OUTPUT_VOLTAGE = 3.3V +/- 5%
    ldo.Vin ~ power_batt
    ldo.Vout ~ power_3V3
    ldo.ic.EN ~ uc.gpios[5]
    ldo_pullup = new Resistor; ldo_pullup.value = 100kohm; ldo_pullup.package = "R0201"
    ldo_pullup.p1 ~ ldo.ic.EN; ldo_pullup.p2 ~ power_3V3.vcc
```

## Projects Built with Atopile

Here are some of my projects designed with atopile — each one uses the package/assertion workflow described above.

### MicroMPPT V3 — Solar charge controller
<div class="row justify-content-center">
    <div class="col-sm-5 mt-2 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/Gallery/micrompptV3.png" alt="MicroMPPT V3 PCB render" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Tiny MPPT solar charge controller. V3 was the first version fully designed in atopile. Uses auto-picked passives and constraint assertions for the feedback divider and current sense resistors. [Project page](/projects/micromppt) &#124; [GitHub](https://github.com/eigenlucy/BQ2425X_MicroMPPT)

### WASP — Wearable AI Synthesis Platform
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/Gallery/wasppcbtop.jpg" alt="WASP PCB top" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/Gallery/wasptop.png" alt="WASP 3D render" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

BLE 5.2 wearable with IMU, MEMS mic, and BQ24045 battery management. Imports the NCP1529 regulator package shown above — `ldo.OUTPUT_VOLTAGE = 3.3V +/- 5%` configures the whole power supply. [Project page](/projects/wasp) &#124; [GitHub](https://github.com/eigenlucy/wasp)

### Open Flashlight — LED/Laser driver
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/Gallery/OpenFlashlightPCB2.png" alt="Open Flashlight PCB" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/Gallery/OpenFlashLightRender.jpg" alt="Open Flashlight CC driver render" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Modular constant-current LED/laser driver with ATtiny816 control. Multiple atopile submodules (`ccdriver.ato`, `uv-lamp.ato`, `attiny816.ato`). [Project page](/projects/openflashlight) &#124; [GitHub](https://github.com/eigenlucy/openflashlight)

### Izzy Monitor — Custom macro keyboard + sensor hub
<div class="row">
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/Gallery/izzymonitor.jpg" alt="Izzy Monitor assembled" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-2 mt-md-0">
        {% include figure.liquid loading="lazy" path="assets/img/Gallery/izzymonitorrender.png" alt="Izzy Monitor 3D render" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

ESP32-S3 macro keyboard with environmental sensors and e-ink display. [Project page](/projects/izzymonitor)

## Installation

**Mac**
1. Install [Homebrew](https://brew.sh/)
2. Install [KiCad 9](https://formulae.brew.sh/cask/kicad)
3. Install atopile with Homebrew: `brew install atopile/tap/atopile`
4. Configure the atopile plugin: `ato configure`

**Linux (Ubuntu, Debian, Arch, NixOS)**
1. Install [uv](https://github.com/astral-sh/uv)
2. Install KiCad with your preferred package manager (apt for Debian, pacman for Arch, etc)
3. Install atopile as a tool with uv. As of writing this, you should be using Python 3.13.2:
```
$ uv tool install atopile
```
4. Check your version: `ato --version`
5. Configure the atopile plugin: `ato configure`

**Alternative Linux install** (my preferred method, easier to debug and manage versions):
1. Clone the main [atopile repo](https://github.com/atopile/atopile)
2. Remove the uv lock file: `rm uv.lock`
3. Sync repo to dev release: `uv sync --dev`
4. Compile atopile: `uv build`
5. Install the binary: `uv tool install atopile-0.3.XX-cp313-cp313-linux-_x86_64.whl`
6. Add the uv tools binary directory to your PATH (command depends on your shell, e.g. with fish):
```
$ fish_add_path /home/user/.local/share/uv/tools/atopile/
```
7. Check your version: `ato --version`
8. Configure the atopile plugin: `ato configure`

**VS Code / Cursor Extension**

Install the [atopile extension](https://marketplace.visualstudio.com/items?itemName=atopile.atopile) into Cursor or VS Code for syntax highlighting and language support.

**Building a Project**
1. Install dependencies from `ato.yaml`: `ato sync`
    - If the project also uses git submodules (e.g. for the ESPHome-Panel), run `git submodule update --init --recursive` too — make sure you're on the specific commit hash the project was built around
2. Build the project to select components based on JLCPCB availability and load them into the KiCad PCB: `ato build -t all`
3. Complete/review the layout with KiCad Standalone PCB editor
4. Gerbers/PCBA files are generated through an Actions run on a commit and placed in the build artifacts folder
