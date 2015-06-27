var midi     = require('midi');
var power    = require('./lib/power');
var Patchbay = require('./lib/patchbay');
var SubMixer = require('./lib/submixer');
var mappers  = require('./lib/mappers');
var LFO      = require('./lib/modulators/LFO');
var Kinect   = require('./lib/modulators/kinect');

power.on().then(function(channels) {
  console.log("Powered On");

  patchbay = new Patchbay(channels.input, channels.output);

  // filter_mixer = new SubMixer();
  // filter_mixer.lineIn(new LFO(400));
  // filter_mixer.lineIn(new LFO(10));

  // patchbay.connect(filter_mixer, mappers.lowpass);
  // patchbay.connect(new LFO(200), mappers.reso);
  patchbay.connect(new Kinect(), mappers.lowpass);

  // channels.input.on('signal', function(deltaTime, message, d) {
  //   console.log('m:' + message + ' d:' + deltaTime);
  //   channels.output.sendMessage([0x0B, 19, message]);
  // });
});
