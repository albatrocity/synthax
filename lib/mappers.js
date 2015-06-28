LPF  = require('./mappers/LPF');
Reso = require('./mappers/reso');

module.exports = {
  lowpass: new LPF,
  reso: new Reso,
  connect: function(main_out) {
    m = this;
    Object.keys(this).forEach(function(k) {
      m[k].output = main_out;
    });
  }
}
