export class BowlingGame {
  private _gameScore: Array<string>;

  getScore(gameScore) {
    const gameScoreArray = gameScore.split(' ');
    let gameScorePoints = 0;

    gameScoreArray.forEach((frame) => {
      const frameArray = frame.split('');
      let frameScore = 0;

      frameArray.forEach((roll) => {
        frameScore += this.getRollValue(roll);
      });

      gameScorePoints += frameScore;
    });

    console.log('-----------------', gameScorePoints);
    return gameScorePoints;
  }

  getRollValue(roll) {
    if (roll === '-') { return 0; }
    if ((roll === 'X') || (roll === '/')) { return 10; }

    return roll;
  }
}

