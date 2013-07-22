(function () {
  'use strict';

  var self = this;

  self.BowlingGame = function () {

    // Our public API
    var exports = {};

    // Private vars
    var frames = [];

    exports.roll = function (numPinsFell) {
      var thisFrame;
      var newFrame = false;
      var lastFrame = _.last(frames);
      var frameIndex = (frames.length) ? frames.length - 1 : 0;

      if (!lastFrame || lastFrame.length === 2 || lastFrame[0] === 10) {
        thisFrame = [];
        newFrame = true;
      } else {
        thisFrame = lastFrame;
      }

      thisFrame.push(numPinsFell);
      if(newFrame)
        frames.push(thisFrame);
      else
        frames[frameIndex] = thisFrame;
    };

    exports.getScore = function () {
      var score = 0;
      var frame;
      var frameScore = 0;

      for (var i = 0; i < frames.length; i++) {
        frame = frames[i];
        frameScore = 0;

        if (i < 9 && frame[0] == 10) { // case strike
          var next = 0;
          var nextNext = 0;
          // -- has next frame
          if (frames[i+1]) {
            next = frames[i+1][0];
            // -- next frame is strike
            if (frames[i+1][0] == 10) {
              // -- has next next frame
              if (frames[i+2]) {
                nextNext = frames[i+2][0];
              }
            } else {
              if (frames[i+1][1]) {
                nextNext = frames[i+1][1];
              }
            }
          } else {
            next = 0;
            nextNext = 0;
          }


          frameScore = 10 + next + nextNext;
        } else if (i < 9 && frame[0] + frame[1] == 10) { // case spare
          frameScore = 10 + frames[i+1][0];
        } else {
          frameScore = frame[0];
          if (frame[1])
            frameScore += frame[1];
        }
        score += frameScore;
      };

      return score;
    };

    return exports;
  };

  self.BowlingGame.create = function () {
    var newObject = self.BowlingGame(); // Pass in dependancies();
    return newObject;
  };
}).call(window);