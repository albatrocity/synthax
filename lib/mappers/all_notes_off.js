var EventEmitter = require('events').EventEmitter;

var AllNotesOff = function(options) {
  this.input = new EventEmitter();
  this.output = null;

  var handler = this.onValue.bind(this);
  this.input.on('signal', handler);

};
AllNotesOff.prototype.onValue = function(data) {
  console.log("ALL NOTES OFF");
  var data = 0;
  for (var note = 0; note < 128; note++){
    this.output.sendMessage([128, note, 10]);
  }
}
AllNotesOff.prototype.setOutput = function(output) {
  this.output = output;
}

module.exports = AllNotesOff;
