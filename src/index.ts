const LAST_FRAME = 9;

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
      const rolls = frame.split('');
      return this.calculateRollsValue(rolls);
    });
  }

  calculateRollsValue(rolls: Array<string>) {
    let rollValue = 0;

    return rolls.map((roll, index) => {
      if ((index === 1) && (roll === '/')) {
        // calculate Spare Score
        rollValue = this.getRollValue(roll) - this.getRollValue(rolls[index -1]);
      } else {
        rollValue = this.getRollValue(roll);
      }
      return rollValue;
    });

  }

  getRollValue(roll) {
    if (roll === '-') return 0;
    if ((roll === 'X') || (roll === '/')) return 10;

    return parseInt(roll);
  }
}

