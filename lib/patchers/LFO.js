var EventEmitter = require('events').EventEmitter;

module.exports = function LFO(rate) {
  return {
    output: new EventEmitter(),
    osc: null,
    connect: function() {
      this.oscillate();
      return this;
    },
    oscillate: function() {
      console.log("oscillate!");
      var cv = 0

      var _this = this;
      var pos = true;
      function frame() {
        if (cv < 0) {
            pos = true;
        } else if (cv > 127) {
            pos = false;
        }
        pos?cv += 1:cv -= 1;
        console.log(cv);
        _this.output.emit('signal', cv);
      }
      this.osc = setInterval(frame, 10);
    },
    disconnect: function() {
      clearInterval(this.osc);
    }
  }
}