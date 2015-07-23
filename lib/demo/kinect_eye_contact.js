power.on().then(function(channels) {
  console.log("Powered On");

  var patchbay = new Patchbay(channels.input, channels.output);
  phatty.connect(channels.output);

  var video = new KinectVideo();
  var videoBuss = new Buss;
  videoBuss.lineIn(video);

  var ca = new Color;
  green_pre = new Preamp({
    dataValue: 'green', rMin: 0, rMax: 256
  });
  patchbay.connect(videoBuss, ca);
  patchbay.connect(ca, green_pre);
  patchbay.connect(green_pre, phatty.lowpass);

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
  patchbay.connect(videoBuss, faces);
  patchbay.connect(faces, eye_contact);

});
