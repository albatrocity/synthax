var midi     = require('midi');
var power    = require('./lib/power');
var Patchbay = require('./lib/patchbay');
var mappers  = require('./lib/mappers');
var LFO      = require('./lib/patchers/LFO');

power.on().then(function(channels) {
  console.log("Powered On");

  patchbay = new Patchbay(channels.input, channels.output);
  patchbay.connect(new LFO(), mappers.lowpass);

  channels.input.on('message', function(deltaTime, message, d) {
    console.log('m:' + message + ' d:' + deltaTime);
    channels.output.sendMessage([0x0B, 19, message]);
  });
});