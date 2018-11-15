const GAME_SCORE_DELIMITER = ' ';
const FRAME_ROLL_DELIMITER = '';

export class ScoreParser {
  private _gameScores: Array<number>;

  constructor (gameScores: string) {
    this._gameScores = this.convertGameScoresToValues(gameScores.split(GAME_SCORE_DELIMITER));
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

  getRollValue(roll) {
    if (roll === '-') return 0;
    if ((roll === 'X') || (roll === '/')) return 10;

    return parseInt(roll);
  }

  private _isSpare(index, currentRoll) {
    return ((index === 1) && (currentRoll === '/'));
  }

  gameScores() {
    return this._gameScores;
  }
}
