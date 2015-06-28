var ColorThief   = require('color-thief');
var EventEmitter = require('events').EventEmitter;

module.exports = function ColorAnalyzer() {
  console.log('color analyzer');
  var input  = new EventEmitter();
  var output = new EventEmitter();
  var analyzeVideo = function(filePath) {
    var colorThief = new ColorThief;
    color = colorThief.getColor(filePath);
    return {
      red: color[0],
      green: color[1],
      blue: color[2]
    };
  };

  color_analyzer = {
    input: input,
    output: output,
    connect: function(out) {
      console.log('connect')
    }
  }
  color_analyzer.input.on('signal', function(data) {
    var colors = analyzeVideo(data.filePath);
    color_analyzer.output.emit('signal', colors);
  });
  return color_analyzer;

};
