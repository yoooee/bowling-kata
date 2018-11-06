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
    let standardScore = gameScores.reduce(function(score, frame, index) {
      let rolls = BowlingGame.getRollsPerFrame(frame);

      if(rolls[1] === '-') {
        return score + +rolls[0];
      } else if (rolls[1] === '/') {
        if (index < 9 ) {
          let nextFrameRoll1Score = BowlingGame.getRollsPerFrame(gameScores[index + 1][0]);
          return +score + 10 + +nextFrameRoll1Score;
        } else {
          let finalFrameScore = rolls.reduce(function(score, roll) {
            if(roll === 'X') {
              return 10;
            } else if (roll === '/') {
              return 10;
            } else {
              return +score + +roll;
            }
          }, 0);
          return +score + +finalFrameScore;
        }
      } else {
        return +score + +rolls[0] + +rolls[1];
      }
    }, 0);
    return standardScore;
  }

  static getRollsPerFrame(frame) {
    return frame.split('');
  }
}
