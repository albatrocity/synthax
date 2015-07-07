var cv           = require('opencv');
var EventEmitter = require('events').EventEmitter;


var readEyes = function(im) {
  im.detectObject('./lib/analyzers/data/eye_pair.xml', {}, function(err, eye_pair){
    prev_val = face_detector.eyes_state;
    if (eye_pair.length > 0) {
      face_detector.eyes_state = 'open';
    } else {
      face_detector.eyes_state = 'closed';
    };
    if (prev_val == 'open' && face_detector.eyes_state == 'closed') {
      face_detector.output.emit('action', 'eyes_closed')
      face_detector.eyes_state = 'closed'
    };
    if (prev_val == 'closed' && face_detector.eyes_state == 'open') {
      face_detector.output.emit('action', 'eyes_opened')
    };
  });
}

var readMouth = function(im) {
  im.detectObject('./lib/analyzers/data/mouth.xml', {}, function(err, mouths){
    if (mouths.length > 0) {
      face_detector.mouth = mouths[0]
    }
  });
  return face_detector.mouth;
}


module.exports = function ColorAnalyzer() {
  console.log('face detector');
  var input  = new EventEmitter();
  var output = new EventEmitter();
  var analyzeVideo = function(filePath) {
    cv.readImage(filePath, function(err, im){
      readEyes(im);
      var mouth = readMouth(im);
      return {
        mouth: mouth
      }
    });
  };

  face_detector = {
    input: input,
    output: output,
    eyes_state: 'closed',
    mouth: {},
    connect: function(out) {
      console.log('connect')
    }
  }
  face_detector.input.on('signal', function(data) {
    var data = analyzeVideo(data.filePath);
    face_detector.output.emit('signal', data);
  });
  return face_detector;

};
