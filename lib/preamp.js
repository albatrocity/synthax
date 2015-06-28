var EventEmitter = require('events').EventEmitter;
var utils = require('./utils');

module.exports = function Preamp(options) {
  var input  = new EventEmitter();
  var output = new EventEmitter();
  var rMin = 0;
  var rMax = 127;
  if (options && (options.rMin || options.rMax)) {
    var rMin = options.rMin;
    var rMax = options.rMax;
  }

  var preamp = {
    output: output,
    input: input,
    connect: function(options) {
      return this;
    }
  };

  input.on('signal', function(data) {
    if (options && options.dataValue) {
      data = data[options.dataValue];
    };
    data = utils.scaleToMidi(data, [rMin, rMax]);
    preamp.output.emit('signal', data);
  });

  return preamp;
}
