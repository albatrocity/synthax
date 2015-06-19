var midi = require('midi');
var Q    = require('q');
var prompt = require('prompt');

module.exports = {
  on: function() {
    console.log("Powering on");
    var dfd = Q.defer();
    var input  = new midi.input();
    var output = new midi.output();
    var _this  = this;
    _this.findMIDIDevices(input).then(function(input) {
      console.log("Chose an input");
      _this.findMIDIDevices(output).then(function(output) {
        dfd.resolve({input: input, output: output});
      });
    });
    return dfd.promise;
  },
  findMIDIDevices: function(channel) {
    console.log("Finding MIDI Devices");
    var dfd = Q.defer();
    var portCount = channel.getPortCount();
    if(portCount > 0) {
      console.log(String(portCount) + " MIDI devices available.");
      console.log("");
      this.askForInput(channel).then(function(port) {
        channel.openPort(Number(port));
        dfd.resolve(channel);
      });
    } else {
      console.log("No MIDI input sources available.");
      channel.closePort();
    }
    return dfd.promise;
  },
  askForInput: function(input) {
    var dfd = Q.defer();

    prompt.start();
    var inputs = []
    for (i = 0; i < input.getPortCount(); i++){ inputs.push(i); };

    console.log("");
    inputs.forEach(function(i) {
      console.log(String(i) + ": " + input.getPortName(i));
    });

    prompt.get(['Choose an input'], function (err, result) {
      var choice = result['Choose an input'];
      dfd.resolve(choice);
    });

    return dfd.promise;

  }
}