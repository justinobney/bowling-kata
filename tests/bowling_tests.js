describe('Bowling Kata tests', function(){
  var game;

  function rollMany(rolls, numPinsFell){
    for (var i = rolls - 1; i >= 0; i--) {
      game.roll(numPinsFell);
    }
  }

  beforeEach(function(){
    game = BowlingGame.create();
  });

  it('game should exist', function () {
    expect(game).toBeDefined();
  });

  it('should score zero for a gutter game', function () {
    rollMany(20, 0);
    expect(game.getScore()).toEqual(0);
  });

  it('should score 20 when all rolls knock down 1 pin', function () {
    rollMany(20,1);

    var gameScore = game.getScore();

    expect(gameScore).toEqual(20);
  });

  it('should score 40 when all rolls knock down 2 pins', function () {
    rollMany(20,2);

    var gameScore = game.getScore();

    expect(gameScore).toEqual(40);
  });

  it('should handle a spare', function () {
    game.roll(5);
    game.roll(5);
    game.roll(3);
    rollMany(17,0);

    var score = game.getScore();
    expect(score).toEqual(16);
  });

  it('should handle a strike', function () {
    game.roll(5);
    game.roll(4);
    game.roll(10);
    game.roll(3);
    game.roll(6);

    rollMany(14,0);

    var score = game.getScore();
    expect(score).toEqual(37);
  });

  it('should handle back to back stikes', function () {
    game.roll(5); //   5
    game.roll(4); //   4
    game.roll(10); // 26
    game.roll(10); // 19
    game.roll(6); //   6
    game.roll(3); //   3

    rollMany(12,0);

    var score = game.getScore();
    expect(score).toEqual(63);
  });

  it('should score 240 for 9 strikes', function () {
    rollMany(9, 10);
    var gameScore = game.getScore();

    expect(gameScore).toEqual(240);
  });

  it('should score 270 for 10 strikes', function () {
    rollMany(10, 10);
    var gameScore = game.getScore();

    expect(gameScore).toEqual(270);
  });

  it('should handle a perfect game', function () {
    rollMany(12, 10);
    var gameScore = game.getScore();

    expect(gameScore).toEqual(300);
  });

  it('should score 150 for a game of all 5s', function () {
    rollMany(21, 5);
    var gameScore = game.getScore();

    expect(gameScore).toEqual(150);
  });
});