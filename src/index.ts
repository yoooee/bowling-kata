import { Frame } from './frame';
import { ScoreParser } from './score-parser';

const LAST_FRAME = 9;
const MAX_FRAME_SCORE = 10;
const STRIKE = 10;

export class BowlingGame {
  private _gameScores: Array<Frame>;

  getScore(gameScore): number {
    let bowlingGameScores = new ScoreParser(gameScore);
    this._gameScores = bowlingGameScores.gameScores();

    return this._gameScores.reduce((totalScore: number, currentFrame: Frame) => {
      return totalScore + this.getCurrentFrameScore(currentFrame);
    }, 0);
  }

  getCurrentFrameScore(currentFrame) {
    let bonus = this.calculateBonusScore(currentFrame);
    return currentFrame.total + this.calculateBonusScore(currentFrame);
  }

  calculateBonusScore(frame :Frame) {
    let bonusScore = 0;

    if (frame.total === MAX_FRAME_SCORE) {
      bonusScore = this.getNextFrame(frame.index).roll1;

      if (bonusScore === STRIKE) {
        bonusScore += this.getNextRoll(frame.index);
      } else {
        // REGUALR
        if (frame.roll1 === MAX_FRAME_SCORE) {
          bonusScore += this.getNextFrame(frame.index).roll2;
        }
      }
    }
    return bonusScore;
  }

  getNextRoll(currentFrameIndex) {
    if (!this._isLastFrame(currentFrameIndex)) {
      return this._gameScores[currentFrameIndex + 2].roll1;
    }

    return this._gameScores[currentFrameIndex + 1].roll2;
  }

  getNextFrame(currentFrame) {
    return this._gameScores[currentFrame + 1];
  }

  private _isLastFrame(frameIndex) {
    return frameIndex >= LAST_FRAME - 1;
  }

}
