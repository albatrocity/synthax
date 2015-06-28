var midi        = require('midi');
var power       = require('./lib/power');
var Patchbay    = require('./lib/patchbay');
var SubMixer    = require('./lib/submixer');
var mappers     = require('./lib/mappers');
var LFO         = require('./lib/input_sources/LFO');
var KinectVideo = require('./lib/input_sources/kinect_video');
var Preamp      = require('./lib/preamp');
var Color       = require('./lib/analyzers/color_analyzer');

power.on().then(function(channels) {
  console.log("Powered On");

  var patchbay = new Patchbay(channels.input, channels.output);
  mappers.connect(channels.output);

  filter_mixer = new SubMixer();
  filter_mixer.lineIn(new LFO(400));
  filter_mixer.lineIn(new LFO(10));
  // patchbay.connect(new LFO(200), mappers.reso);
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
