export class BowlingGame {
  static getScore(gameScore) {
    let gameScores = gameScore.split(' ');

    if(BowlingGame.checkPerfectGame(gameScores)) {
      return 300;
    } else if (BowlingGame.checkGutterGame(gameScores)) {
      return 0;
    } else {
      return BowlingGame.getStandardScore(gameScores);
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


  static getStandardScore(gameScores) {
    let standardScore = gameScores.reduce(function(score, frame){
      let rolls = frame.split('');

      if(rolls[1] === '-') {
        return score + +rolls[0];
      } else if (rolls[1] === '/') {
        // spare
      } else {
        console.log('rolls total = ', +rolls[0] + +rolls[1]);
        return +score + +rolls[0] + +rolls[1];
      }
    }, 0);
    return standardScore;
  }
}
