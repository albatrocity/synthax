LPF  = require('./mappers/LPF');
Reso = require('./mappers/reso');

module.exports = {
  lowpass: new LPF,
  reso: new Reso
}