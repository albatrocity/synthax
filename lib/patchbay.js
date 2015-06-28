module.exports = function Patchbay(input, output) {
  return {
    patches: [],
    input: input,
    output: output,
    connect: function(input, output, toMaster) {
      console.log("patchbay#connect");
      console.log(input);
      console.log(output);
      if (toMaster) {
        output.output = this.output;
      };
      // input.output.on('signal', function() {console.log('signal')})
      var patchbay = this;
      var patch = {
        input: input,
        output: output,
        emitter: input.connect()
      };
      console.log("patchbay: created patch")
      // patch.input.connect(output);

      patch.input.output.on('signal', function(payload) {
        patchbay.route(patch, payload);
      });
      this.patches.push(patch);
    },
    route: function(patch, payload) {
      patch.output.input.emit('signal', payload);
    }
  }
}
