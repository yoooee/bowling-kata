import { Frame } from './frame';

const LAST_FRAME = 9;
const MAX_FRAME_SCORE = 10;
const STRIKE = 10;
const GAME_SCORE_DELIMITER = ' ';
const FRAME_ROLL_DELIMITER = '';


export class BowlingGame {
  private _gameScores: Array<number>;

  getScore(gameScore): number {
    let gameScorePoints: number = 0;
    this._gameScores = this.convertGameScoresToValues(gameScore.split(GAME_SCORE_DELIMITER));

    return this._gameScores.reduce((totalScore: number, currentFrame: number, index: number) => {
      return totalScore + this.getCurrentFrameScore(currentFrame, index);
    }, 0);
  }

  getCurrentFrameScore(currentFrame, index) {
    let bonusScore = 0;
    const frame: Frame = new Frame(index, ...currentFrame);
    bonusScore = this.calculateBonusScore(frame);
    return frame.total + bonusScore;
  }

  calculateBonusScore(frame :Frame) {
   let bonusScore = 0; 
    if (frame.total === MAX_FRAME_SCORE) {
      bonusScore = this.getNextFrameRoll1(frame.index);

      if (bonusScore === STRIKE) {
        if (this._isLastFrame(frame.index)) {
          bonusScore += this.getNextStrikeFrameRoll1(frame.index);
        } else {
          bonusScore += this.getNextFrameRoll2(frame.index);
        }
      } else {
        // REGUALR
        if (frame.roll1 === MAX_FRAME_SCORE) {
          bonusScore += this.getNextFrameRoll2(frame.index);
        }
      }
    }
    return bonusScore;
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

