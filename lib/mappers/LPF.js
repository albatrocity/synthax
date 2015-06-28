var EventEmitter = require('events').EventEmitter;

module.exports = function LPF() {
  var input = new EventEmitter();
  var lpf = {
    input: input,
    output: null
  }

  input.on('signal', function(data) {
    lpf.output.sendMessage([176, 19, data]);
  });

  return lpf;
}
