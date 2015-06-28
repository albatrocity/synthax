var midi        = require('midi');
var power       = require('./lib/power');
var Patchbay    = require('./lib/patchbay');
var SubMixer    = require('./lib/submixer');
var phatty      = require('./lib/mappers/sub_phatty');
var LFO         = require('./lib/input_sources/LFO');
var KinectVideo = require('./lib/input_sources/kinect_video');
var Preamp      = require('./lib/preamp');
var Color       = require('./lib/analyzers/color_analyzer');

power.on().then(function(channels) {
  console.log("Powered On");

  var patchbay = new Patchbay(channels.input, channels.output);
  phatty.connect(channels.output);

  // filter_mixer = new SubMixer();
  // filter_mixer.lineIn(new LFO(400));
  // filter_mixer.lineIn(new LFO(10));

  var video = new KinectVideo();
  var ca = new Color;

  green_pre = new Preamp({dataValue: 'green', rMin: 0, rMax: 256});
  red_pre   = new Preamp({dataValue: 'red', rMin: 0, rMax: 256});
  blue_pre  = new Preamp({dataValue: 'blue', rMin: 0, rMax: 256});

  patchbay.connect(video, ca);
  patchbay.connect(ca, green_pre);
  patchbay.connect(ca, blue_pre);

  patchbay.connect(green_pre, phatty.vco2_freq);
  patchbay.connect(blue_pre, phatty.lowpass);
  patchbay.connect(red_pre, phatty.multidrive);

});
