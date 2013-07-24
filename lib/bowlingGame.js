(function () {
  'use strict';

  var self = this;

  self.BowlingGame = function () {

    // Our public API
    var exports = {};

    // Private vars
    var frames = [];
    var currentFrame;

    var getNewFrame = function(){
      return {
        rolls: [],
        isSpare: false,
        isStrike: false
      };
    };

    exports.roll = function ( numPinsFell ) {
      // Is a strike

      if ( numPinsFell == 10 ) {
        if (frames.length > 9)
          console.log(currentFrame);

        currentFrame.rolls.push(numPinsFell);
        currentFrame.isStrike = true;

        if (frames.length < 10) {
          frames.push(currentFrame);
          currentFrame = getNewFrame();
        }

      } else {

        currentFrame.rolls.push(numPinsFell);

        if (currentFrame.rolls.length == 2) {

          if (currentFrame.rolls[0] + currentFrame.rolls[1] == 10)
            currentFrame.isSpare = true;

          frames.push(currentFrame);
          currentFrame = getNewFrame();

        }
      }
    };

    exports.getScore = function () {
      var score = 0;
      for (var i = 0; i < frames.length; i++) {
        score += frames[i].rolls[0]; // add first roll

        if (i == 9)
          console.log(frames[i]);

        if ( frames[i].isStrike ) { // Is a strike

          if ( frames[i + 1] ) {
            score += frames[i + 1].rolls[0];

            if (frames[i + 1].isStrike && frames[i + 2]) {
                score += frames[i + 2].rolls[0];
            } else {
              if (frames[i + 1].rolls[1])
              score += frames[i + 1].rolls[1];
            }
          }

        } else { // Not a strike
          score += frames[i].rolls[1];

          if (frames[i].isSpare && frames[i + 1]) {
            score += frames[i + 1].rolls[0];
          }
        }
      }

      return score;
    };

    exports.init = function(){
      currentFrame = getNewFrame();
    };

    return exports;
  };

  self.BowlingGame.create = function () {
    var newObject = self.BowlingGame(); // Pass in dependancies();
    newObject.init();

    return newObject;
  };
}).call(window);