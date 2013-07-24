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

        currentFrame.rolls.push(numPinsFell);
        currentFrame.isStrike = true;

        if (frames.length < 9) {
          frames.push(currentFrame);
          currentFrame = getNewFrame();
        } else if ( (currentFrame.isStrike || currentFrame.isSpare) && currentFrame.rolls.length == 3 ) {
            frames.push(currentFrame);
        }

      } else {

        currentFrame.rolls.push(numPinsFell);

        if (currentFrame.rolls.length >= 2) {

          if (currentFrame.rolls[0] + currentFrame.rolls[1] == 10)
            currentFrame.isSpare = true;

          if(frames.length < 9) {
            frames.push(currentFrame);
            currentFrame = getNewFrame();
          } else if ( !(currentFrame.isSpare || currentFrame.isStrike) || currentFrame.rolls.length == 3) {
            frames.push(currentFrame);
            currentFrame = getNewFrame();
          }
        }
      }
    };

    var handleStrikeScore = function(idx){
      var score = 0;

      if ( frames[idx + 1] ) {
        score += frames[idx + 1].rolls[0];

        if (frames[idx + 1].isStrike && frames[idx + 2]) {
          score += frames[idx + 2].rolls[0];
        } else if (frames[idx + 1].rolls[1]) {
          score += frames[idx + 1].rolls[1];
        }
      }

      return score;
    };

    var handleSpareScore = function(idx){
      var score = 0;

      if (frames[idx + 1]) {
        score += frames[idx + 1].rolls[0];
      }

      return score;
    };

    exports.getScore = function () {
      var score = 0;

      for (var i = 0; i < frames.length; i++) {

        if (i == 9 && (frames[i].isStrike || frames[i].isSpare)) {
          score += frames[i].rolls[0] + frames[i].rolls[1] + frames[i].rolls[2];
        } else {
          score += frames[i].rolls[0]; // always add first roll

          if ( frames[i].isStrike ) {
            score += handleStrikeScore(i, score);
          } else {
            score += frames[i].rolls[1];

            if (frames[i].isSpare)
              score += handleSpareScore(i);
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