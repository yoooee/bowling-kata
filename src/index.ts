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
      const frameTotal = roll1 + roll2 + roll3;

      if (frameTotal === 10) {
        bonusScore = this.getNextRoll(i);
        if (bonusScore === 10) {
            bonusScore += this.getNextRoll(i +  1);
        } else {
          bonusScore = this.getNextRoll(i);
        }
      }
      gameScorePoints += frameTotal + bonusScore;
    }

    return gameScorePoints;
  }

  getNextRoll(currentFrame) {
    let nextRollValue = 0;

    if(currentFrame < LAST_FRAME) {
      nextRollValue =  this._gameScores[currentFrame + 1][0];
    } else {
      nextRollValue = this._gameScores[currentFrame][1];
    }
    return nextRollValue;

  }

  convertGameScoreToArray(gameScore) {
    return gameScore.map((frame) => {
      const rolls = frame.split('');
      let rollValue = 0;
      const rollScores = rolls.map((roll, index) => {
        if ((index === 1) && (roll === '/')) {
          rollValue = this.getRollValue(roll) - rolls[index -1];
        } else {
          rollValue = this.getRollValue(roll);
        }
        return rollValue;
      });
      return rollScores;
    });
  }

  getRollValue(roll) {
    if (roll === '-') { return 0; }
    if ((roll === 'X') || (roll === '/')) { return 10; }
    return parseInt(roll);
  }
}

//let gamescore = '54 72 9- X 81 X X 81 9- XXX';
let gamescore = '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 50';
//let gamescore = 'X X X X X X X X X XXX';
let myGame = new BowlingGame();
console.log(myGame.getScore(gamescore));

