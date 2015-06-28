# synthax

_very_ early development stages, no documentation.

Node version is locked at `0.10.25` for the [node-kinect](https://github.com/nguyer/node-kinect) library.

A MIDI patching/mixing library. Intended to be used to send control change signals generated by a variety of modulation sources.


# Installation

#### If you'll be using the Xbox 360 Kinect module:
* `brew install nvm`
* `nvm install 0.10.25`
* `nvm use 0.10.25`
* `brew install libusb`
* `brew install libfreenect`
* Connect Xbox 360 Kinect
* Connect in USB MIDI device
* `npm install`
* `npm start`

#### Otherwise
* `npm install`
* Connect in USB MIDI device
* `npm start`



# Concepts

## Power
Include the Power module - `require('./lib/power')` - and call `power.on()` to set up your MIDI I/O. `power.on` returns a promise that returns a `channels` object.

## Mappers
Mappers are responsible for sending a passed MIDI value to a particular CC or MIDI channel of the main output. They must return an object with an `input` and `output` values of EventEmitters. Output should be `null` by default. Use `mappers#connect` to set the device output (see example below).

## Patchbay
The Patchbay is used to route MIDI signal between modules. It is currently instantiated with input and output arguments, but I might remove those in favor of more flexible routing. Use `connect` to connect to modules together, which sets up event listeners.

**Usage**
```js
power.on().then(function(channels) {
  mappers.connect(channels.output); // set all mapper outputs to main device out

  var patchbay = new Patchbay(channels.input, channels.output);
  patchbay.connect(new LFO(200), mappers.reso);
});
```

## Input Sources
An Input Source is any module that creates its own values to be converted to MIDI data. The LFO is a simple input sources that emits integer values over time. The Kinect Video input source captures video data and emits each frame. An Input Source is `lineLevel` if it emits values within the MIDI range (0-127). The LFO is `lineLevel`, the Kinect Video is not.

## Analyzers
If an Input Source is _not_ `lineLevel`, you can patch it into an Analyzer or a Preamp to standardize output values. Analyzers are used to turn arbitrary data into integer values with a known minimum and maximum. The Color Analyzer accepts an image, finds a dominant color, and emits an object containing RGB values between 0 and 256.

## Preamps
Preamps accept any data source and convert numeric values into useable MIDI values. When creating a new preamp, you can pass an options object that will determine how a value is created.

**Options**  
* `dataValue`: _String_ - a getter to be called on each data event to retrieve the desired value
* `rMin`: _Number_ - the minimum number in the range of the input source
* `rMax`: _Number_ - the maximum number in the range of the input source

`rMin` and `rMax` are used to scale values proportionally to MIDI.

**Usage**
```js
var video = new KinectVideo(); // Kinect Video input source
var ca = new Color; // Color Analyzer

patchbay.connect(video, ca); // Send video to color analyzer

// Create Preamp to select "green" value of color analysis and scale it
// proportionally from 0 to 256
green_pre = new Preamp({
  dataValue: 'green', rMin: 0, rMax: 256
});

patchbay.connect(ca, green_pre); // Send Color Analysis to preamp

// send output of the preamp to the LPF mapper
patchbay.connect(green_pre, mappers.lowpass);
```

## Submixers
Submixers accept multiple input sources and blend them together, emitting an average output.

**Usage**

```js
filter_mixer = new SubMixer();
filter_mixer.lineIn(new LFO(400)); // Connect one LFO
filter_mixer.lineIn(new LFO(10));  // Connect a second LFO
patchbay.connect(filter_mixer, mappers.lowpass); // connect output to LPF
```

# Example

```json
var power       = require('./lib/power');
var Patchbay    = require('./lib/patchbay');
var SubMixer    = require('./lib/submixer');
var mappers     = require('./lib/mappers');
var LFO         = require('./lib/input_sources/LFO');
var KinectVideo = require('./lib/input_sources/kinect_video');
var Preamp      = require('./lib/preamp');
var Color       = require('./lib/analyzers/color_analyzer');

power.on().then(function(channels) {
  var patchbay = new Patchbay(channels.input, channels.output);
  mappers.connect(channels.output);

  filter_mixer = new SubMixer();
  filter_mixer.lineIn(new LFO(400));
  filter_mixer.lineIn(new LFO(10));

  patchbay.connect(new LFO(200), mappers.reso);

  var video = new KinectVideo();
  var ca = new Color;

  green_pre = new Preamp({
    dataValue: 'green', rMin: 0, rMax: 256
  });

  patchbay.connect(video, ca);
  patchbay.connect(ca, green_pre);

  filter_mixer.lineIn(video_pre);
  patchbay.connect(filter_mixer, mappers.lowpass);

});
```

### Roadmap
* **done** <del>MIDI I/O device selection</del>
* **done** <del>Patchbay to route modulation sources to MIDI category values</del>
* **done** <del>Submixer to blend multiple modulation sources together</del>
* More Core input sources (better LFO with more shapes, audio input, video input, etc.)
* More Core mappers (config standard synthesizer MIDI ports for things like Filter cutoff, resonance, envelopes, etc.) - reference the [Moog Sub Phatty Manual](http://www.moogmusic.com/sites/default/files/SUB_PHATTY_MANUAL_6_13.pdf) for its MIDI OPERATIONS section
* Multiple channel output
* More Core Device configurations (in the case where a device deviates from "standard" MIDI channels)
