var midi        = require('midi');
var power       = require('./lib/power');
var Patchbay    = require('./lib/patchbay');
var SubMixer    = require('./lib/submixer');
var ActionResponder = require('./lib/action_responder');
var phatty      = require('./lib/mappers/sub_phatty');
var LFO         = require('./lib/input_sources/LFO');
var KinectVideo = require('./lib/input_sources/kinect_video');
var Preamp      = require('./lib/preamp');
var Color       = require('./lib/analyzers/color_analyzer');
var Faces       = require('./lib/analyzers/face_detector');
var cv          = require('opencv');

power.on().then(function(channels) {
  console.log("Powered On");

  var patchbay = new Patchbay(channels.input, channels.output);
  phatty.connect(channels.output);

  var video = new KinectVideo();
  // var ca = new Color;
  //
  // green_pre = new Preamp({
  //   dataValue: 'green', rMin: 0, rMax: 256
  // });
  //
  // patchbay.connect(video, ca);
  // patchbay.connect(ca, green_pre);
  //
  // patchbay.connect(green_pre, phatty.lowpass);

  var faces = new Faces;
  var eye_contact = new ActionResponder({
    responders: [
      {
        action: 'eyes_closed',
        mapper: phatty.note_off,
        value: 100
      },
      {
        action: 'eyes_opened',
        mapper: phatty.note_on,
        value: 100
      }
    ]
  });

  patchbay.connect(video, faces);
  patchbay.connect(faces, eye_contact);

});
