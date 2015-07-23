var JpegLib      = require('jpeg');
var Jpeg         = JpegLib.Jpeg;
var fs           = require('fs');
var EventEmitter = require('events').EventEmitter;
// var camera       = require('camera');
var cv           = require('opencv');


module.exports = function CameraVideo(path) {
  var filePath     = './camera.jpeg' || path;
  var camera_video = undefined;
  var output       = new EventEmitter();

  camera_video = {
    output: output,
    filePath: filePath,
    connect: function() {
      console.log("connect camera");
      // captureFrame();
      var camera = new cv.VideoCapture(0);
      var window = new cv.NamedWindow('Video', 0)
      try {
        var camera = new cv.VideoCapture(0);

        setInterval(function() {
          camera.read(function(err, im) {
            if (err) throw err;
            if (im.size()[0] > 0 && im.size()[1] > 0){
              window.show(im);
              captureFrame(im);
            }
            window.blockingWaitKey(0, 50);
          });
        }, 20);

      } catch (e){
        console.log("Couldn't start camera:", e)
      }
      return this;
    },
    disconnect: function() {
      console.log('disconnect camera');
      context.pause();
    }
  }

  var captureFrame = function(im) {
    // var jpeg = new Jpeg(buf, 640, 480, 'rgb');
    // var jpeg_img = jpeg.encodeSync().toString('binary');
    // fs.writeFileSync(filePath, jpeg_img, 'binary');
    im = im.save(filePath);
    var data = {
      image: im,
      filePath: filePath
    };
    camera_video.output.emit('signal', data);
  };
  return camera_video;
}
