const LAST_FRAME = 9;

class Roll {
  score: number = 0;

}
export class BowlingGame {
  private _gameScores: Array<number>;

  getScore(gameScore) {
    const gameFrames = gameScore.split(' ');
    let gameScorePoints = 0;
    this._gameScores = this.convertGameScoreToArray(gameFrames);


    for (let i = 0; i < this._gameScores.length; i++) {
      let bonusScore = 0;
      const roll1 = this._gameScores[i][0] | 0;
      const roll2 = this._gameScores[i][1] | 0;
      const roll3 = this._gameScores[i][2] | 0;
      const frameScore = roll1 + roll2 + roll3;
      const currentFrame = i;
      const nextFrame = i + 1;
      const nextNextFrame = i + 2;

      if (currentFrame < LAST_FRAME - 1) {
        if (frameScore === 10) {
          bonusScore = this._gameScores[nextFrame][0];

          if (bonusScore === 10) {
            bonusScore += this._gameScores[nextNextFrame][0];
          } else {
            if (this._gameScores[currentFrame][0] === 10) {
              bonusScore += this._gameScores[nextFrame][1];
            }
          }
        }
      } else {
        if (frameScore === 10) {
          bonusScore = this._gameScores[nextFrame][0];

          if (bonusScore === 10) {
            bonusScore  += this._gameScores[nextFrame][1]
          }
        }
      }

      gameScorePoints += frameScore + bonusScore;
    }

    return gameScorePoints;
  }

  convertGameScoreToArray(gameScore) {
    return gameScore.map((frame) => {
      return this.calculateRollsValue(frame.split(''));
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

  private _isSpare(index, currentRoll) {
    return ((index === 1) && (currentRoll === '/'));
  }

  getRollValue(roll) {
    if (roll === '-') return 0;
    if ((roll === 'X') || (roll === '/')) return 10;

    return parseInt(roll);
  }
}

