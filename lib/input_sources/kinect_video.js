// Kinect library

var kinect       = require('kinect');
var fs           = require('fs');
var EventEmitter = require('events').EventEmitter;
var utils        = require('../utils');
var ColorThief   = require('color-thief');
var JpegLib      = require('jpeg');
var Jpeg         = JpegLib.Jpeg;

module.exports = function KinectVideo(path) {
  var context      = kinect();
  var colorThief   = new ColorThief;
  var filePath     = './jpeg.jpeg' || path;
  var kinect_video = undefined;
  var output       = new EventEmitter();

  kinect_video = {
    output: output,
    filePath: filePath,
    connect: function() {
      console.log("connect kinect");
      context.led("red");
      context.tilt(15);
      context.start('video');
      context.on('video', captureFrame);
      context.resume();
      return this;
    },
    disconnect: function() {
      console.log('disconnect kinect');
      context.pause();
    }
  }

  var captureFrame = function(buf) {
    var jpeg = new Jpeg(buf, 640, 480, 'rgb');
    var jpeg_img = jpeg.encodeSync().toString('binary');
    fs.writeFileSync(filePath, jpeg_img, 'binary');
    var data = {
      image: jpeg_img,
      filePath: filePath
    };
    kinect_video.output.emit('signal', data);
  };

  return kinect_video;
}
