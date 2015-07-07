var EventEmitter = require('events').EventEmitter;
var utils = require('./utils');

module.exports = function ActionResponder(options) {
  var input  = new EventEmitter();
  var output = new EventEmitter();

  input.on('action', function(data) {
    for (var i = 0; i < options.responders.length; i++){
      var responder = options.responders[i];
      if (data == responder.action) {
        responder.mapper.onValue(responder.value);
      }
    }
  });
  return {
    input: input,
    output: output,
    connect: function() {
      console.log('action responder connected');
    }
  };
}
