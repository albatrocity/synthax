module.exports = function Patchbay(input, output) {
  return {
    patches: [],
    input: input,
    output: output,
    connect: function(input, output) {
      console.log("patchbay#connect");
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
