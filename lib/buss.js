// Busses combine input sources' events to one output

var EventEmitter = require('events').EventEmitter;

module.exports = function Buss() {
  var output = new EventEmitter();
  var input  = new EventEmitter();
  return {
    inputs: [],
    input: input,
    output: output,
    connect: function() {
      console.log('buss#connect');
      return this;
    },
    lineIn: function(source) {
      console.log("Buss#lineIn");
      // output.output = this.output;
      var buss = this;

      var source = {
        input: source,
        output: output,
        emitter: source.connect()
      };

      // source.input.connect(output);
      source.input.output.on('signal', function(payload) {
        buss.output.emit('signal', payload);
      });
      source.input.output.on('action', function(payload) {
        buss.output.emit('action', payload);
      });

      buss.inputs.push(source);
    }
  }
}
