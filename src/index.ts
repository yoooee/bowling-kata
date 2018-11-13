const LAST_FRAME = 9;
const MAX_FRAME_SCORE = 10;
const STRIKE = 10;
const GAME_SCORE_DELIMITER = ' ';
const FRAME_ROLL_DELIMITER = '';

export class BowlingGame {
  private _gameScores: Array<number>;

  getScore(gameScore) {
    let gameScorePoints = 0;
    this._gameScores = this.convertGameScoresToValues(gameScore.split(GAME_SCORE_DELIMITER));

    for (let i = 0; i < this._gameScores.length; i++) {
      let bonusScore = 0;
      const roll1 = this._gameScores[i][0] | 0;
      const roll2 = this._gameScores[i][1] | 0;
      const roll3 = this._gameScores[i][2] | 0;
      const totalFrameScore = roll1 + roll2 + roll3;
      const currentFrame = i;
      const nextFrame = i + 1;
      const nextNextFrame = i + 2;
      let nextFrameRoll1 = 0;

      if (totalFrameScore === MAX_FRAME_SCORE) {
        bonusScore = this.getNextFrameRoll1(currentFrame);

        if (bonusScore === STRIKE) {
          if (this._isLastFrame(currentFrame)) {
            bonusScore += this.getNextStrikeFrameRoll1(currentFrame);
          } else {
            bonusScore += this.getNextFrameRoll2(currentFrame);
          }
        } else {
          // REGUALR
          if (roll1 === MAX_FRAME_SCORE) {
            bonusScore += this.getNextFrameRoll2(currentFrame);
          }
        }
      }
      gameScorePoints += totalFrameScore + bonusScore;
    }

    return gameScorePoints;
  }

  getNextFrameRoll1(currentFrame) {
    return this._gameScores[currentFrame + 1][0];
  }

  getNextFrameRoll2(currentFrame) {
    return this._gameScores[currentFrame + 1][1];
  }

  getNextStrikeFrameRoll1(currentFrame) {
    return this._gameScores[currentFrame + 2][0];
  }

  convertGameScoresToValues(gameScore) {
    return gameScore.map((frame) => {
      return this.calculateRollsValue(frame.split(FRAME_ROLL_DELIMITER));
    });
  }

  calculateRollsValue(rolls: Array<string>) {
    return rolls.map((currentRoll, index) => {
      if (this._isSpare(index, currentRoll))
        return this._calculateSpareValue(rolls, currentRoll, index);
      return this.getRollValue(currentRoll);
    });
  }

  private _calculateSpareValue(rolls, currentRoll, index) {
    return this.getRollValue(currentRoll) - this.getRollValue(rolls[index -1]);
  }

  private _isLastFrame(frame) {
    return frame < LAST_FRAME - 1;
  }

  private _isSpare(index, currentRoll) {
    return ((index === 1) && (currentRoll === '/'));
  }

  getRollValue(roll) {
    if (roll === '-') return 0;
    if ((roll === 'X') || (roll === '/')) return 10;

    return parseInt(roll);
  }
}

