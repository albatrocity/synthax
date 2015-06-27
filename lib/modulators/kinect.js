// Kinect library

var kinect = require('kinect');
var EventEmitter = require('events').EventEmitter;

module.exports = function LFO(rate) {
  var context = kinect();

  var analyzeVideo = function(buf) {
    console.log('video');
    console.log(buf);
  };

  return {
    output: new EventEmitter(),
    connect: function() {
      context.led("green");
      context.tilt(10);
      context.start('video');
      context.on('video', analyzeVideo);
      context.resume();
      return this;
    },
    disconnect: function() {
      console.log('disconnect kinect');
      context.pause();
    }
  }
}
