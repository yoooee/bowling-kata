export class BowlingGame {
  static getScore(gameScore) {
    let gameScores = gameScore.split(' ');
    console.log('### New Game #####################################################');
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
    let score: number = 0;

    score = gameScores.reduce((gameScore, currentFrame, currentFrameIndex) => {
      const rolls = BowlingGame.getRolls(currentFrame);

      const currentFrameScore = rolls.reduce((frameScore, currentRoll, currentRollIndex) => {
        return frameScore += +BowlingGame.getPointValue(currentRoll);
      }, 0);
      return gameScore + +currentFrameScore;
    }, 0);

    return score;
  }

  static getPointValue(roll) {
    if(roll === '-') {
      return 0;
    } else if (roll === '/') {
      return 10;
    } else if (roll === 'X') {
      return 10;
    } else {
      return roll;
    }
  }

  static getRolls(frame) {
    return frame.split(''); 
  }
}
