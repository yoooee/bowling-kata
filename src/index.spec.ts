import { BowlingGame } from './index';

describe('Bowling', () => {
  describe('all strikes', () => {
    it('should return a score of 300', () => {
      let GameScore = 'X X X X X X X X X X X X';
      let expected = 300;
      let actual = BowlingGame.getScore(GameScore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all gutter balls', () => {
    it('should return a score of 0', () => {
      let GameScore = '-- -- -- -- -- -- -- -- -- -- -- --';
      let expected = 0;
      let actual = BowlingGame.getScore(GameScore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all 9s for roll 1 and gutter balls for roll 2', () => {
    it('should return a score of 90', () => {
      let gamescore = '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-';
      let expected = 90;
      let actual = BowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all 5s for roll 1 and 2s for roll 2', () => {
    it('should return a score of 90', () => {
      let gamescore = '52 52 52 52 52 52 52 52 52 52';
      let expected = 70;
      let actual = BowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all 2s for roll 1 and spares for roll 2', () => {
    it('should return a score of 120', () => {
      let gamescore = '2/ 2/ 2/ 2/ 2/ 2/ 2/ 2/ 2/ 2/2';
      let expected = 120;
      let actual = BowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);

    });
  });
});
