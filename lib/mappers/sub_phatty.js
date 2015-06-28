Mapper = require('../mapper');

module.exports = {
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
