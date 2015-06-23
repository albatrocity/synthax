// SubMixers mix modulation sources together and send
// them to one output.
//
// var submixer = new SubMixer(output)
// submixer.lineIn(modulationSource1)
// submixer.lineIn(modulationSource2)

var EventEmitter = require('events').EventEmitter;

module.exports = function SubMixer() {
  var output = new EventEmitter();
  return {
    inputs: [],
    output: output,
    connect: function() {
      console.log('submixer#connect');
      return this;
    },
    lineIn: function(source) {
      console.log("SubMixer#lineIn");
      output.output = this.output;
      var mixer = this;

      var source = {
        input: source,
        output: output,
        emitter: source.connect()
      };

      source.input.connect(output);
      console.log("source input connected to submixer out")

      source.input.output.on('signal', function(payload) {
        mixer.mix(source, payload);
      });
      mixer.inputs.push(source);
    },
    mix: function(source, payload) {
      this.inputs[this.inputs.indexOf(source)].value = payload;
      var sum = this.inputs.reduce(function(a, b) {
        return {value: a.value + b.value};
      });
      this.currentVal = sum.value/this.inputs.length;
      console.log(this.currentVal);
      this.output.emit("signal", this.currentVal);
    }
  }
}