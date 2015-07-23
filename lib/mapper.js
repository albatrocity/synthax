var EventEmitter = require('events').EventEmitter;

var Mapper = function(options) {
  if (options && options.cc) {
    this.cc = options.cc;
  };
  if (options && options.name) {
    this.name = options.name;
  };
  this.input = new EventEmitter();
  this.output = null;
  if (options && options.channel) {
    this.channel = options.channel
  } else {
   this.channel = 176;
  }

  var handler = this.onValue.bind(this);
  this.input.on('signal', handler);

};
Mapper.prototype.onValue = function(data) {
  var data = data || 0;
  this.output.sendMessage([this.channel, this.cc, data]);
}
Mapper.prototype.setOutput = function(output) {
  this.output = output;
}

module.exports = Mapper;
