export class BowlingGame {
  static getScore(gameScore) {
    let gameScores = gameScore.split(' ');

    if(BowlingGame.checkPerfectGame(gameScores)) {
      return 300;
    }

    if(BowlingGame.checkGutterGame(gameScores)) {
      return 0;
    }
  }

  static checkGutterGame(gameScores) {
    return !!gameScores.reduce(function(a, b){
      return ((a === b) && (a === '--')) ? a : NaN;
    });
  }

  static checkPerfectGame(gameScores) {
    return !!gameScores.reduce(function(a, b){
      return ((a === b) && (a === 'X')) ? a : NaN;
    });
  }
}
