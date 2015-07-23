Mapper = require('../mapper');
AllNotesOff = require('./all_notes_off');

module.exports = {
  note_on: new Mapper({channel: 144, cc: 50}),
  note_off: new AllNotesOff(),
  lowpass: new Mapper({cc: 19}),
  reso: new Mapper({cc: 21}),
  vco1_wave: new Mapper({name: "VCO 1 Wave", cc: 9}),
  vco2_wave: new Mapper({name: "VCO 2 Wave", cc: 14}),
  vco2_freq: new Mapper({name: "VCO 2 Freq", cc: 12}),
  multidrive: new Mapper({cc: 18}),
  glide_rate: new Mapper({cc: 5}),
  mod_wheel: new Mapper({cc: 1}),
  connect: function(main_out) {
    m = this;
    Object.keys(this).forEach(function(k) {
      if (k != 'connect') {
        m[k].output = main_out;
      };
    });
  }
}
