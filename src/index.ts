import { Frame } from './frame';
import { ScoreParser } from './score-parser';

const LAST_FRAME = 9;
const MAX_FRAME_SCORE = 10;
const STRIKE = 10;


export class BowlingGame {
  private _gameScores: Array<number>;

  getScore(gameScore): number {
    let gameScorePoints: number = 0;
    let bowlingGameScores = new ScoreParser(gameScore);
    this._gameScores = bowlingGameScores.gameScores();


    return this._gameScores.reduce((totalScore: number, currentFrame: number, index: number) => {
      return totalScore + this.getCurrentFrameScore(currentFrame, index);
    }, 0);
  }

  getCurrentFrameScore(currentFrame, index) {
    const frame: Frame = new Frame(index, ...currentFrame);
    return frame.total + this.calculateBonusScore(frame);
  }

  calculateBonusScore(frame :Frame) {
    let bonusScore = 0;

    if (frame.total === MAX_FRAME_SCORE) {
      bonusScore = this.getNextFrameRoll1(frame.index);

      if (bonusScore === STRIKE) {
        bonusScore += this.getNextRoll(frame.index);
      } else {
        // REGUALR
        if (frame.roll1 === MAX_FRAME_SCORE) {
          bonusScore += this.getNextFrameRoll2(frame.index);
        }
      }
    }
    return bonusScore;
  }

  getNextRoll(currentFrameIndex) {
    if (!this._isLastFrame(currentFrameIndex)) {
      return this._gameScores[currentFrameIndex + 2][0];
    }

    return this._gameScores[currentFrameIndex + 1][1];
  }

  getNextFrameRoll1(currentFrame) {
    return this._gameScores[currentFrame + 1][0];
  }

  getNextFrameRoll2(currentFrame) {
    return this._gameScores[currentFrame + 1][1];
  }

  private _isLastFrame(frameIndex) {
    return frameIndex >= LAST_FRAME - 1;
  }

}

