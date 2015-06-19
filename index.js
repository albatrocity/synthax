var midi = require('midi');
var power = require('./lib/power');

power.on().then(function(channels) {
  console.log("Powered On");

  channels.input.on('message', function(deltaTime, message) {
    console.log('m:' + message + ' d:' + deltaTime);
    channels.output.sendMessage(message);
  });
});