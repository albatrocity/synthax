var EventEmitter = require('events').EventEmitter;

module.exports = function Reso() {
  var input = new EventEmitter();
  var reso = {
    input: input,
    output: null
  }

  input.on('signal', function(data) {
    reso.output.sendMessage([176, 21, data]);
  });

  return reso;
}