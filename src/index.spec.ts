import { BowlingGame } from './index';

describe('Bowling', () => {
  describe('all strikes', () => {
    it('should return a score of 300', () => {
      let perfectGameScore = 'X X X X X X X X X X X X';
      let expected = 300;
      let actual = BowlingGame.getScore(perfectGameScore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all gutter balls', () => {
    it('should return a score of 0', () => {
      let gutterBallGameScore = '-- -- -- -- -- -- -- -- -- -- -- --';
      let expected = 0;
      let actual = BowlingGame.getScore(gutterBallGameScore);

      expect(actual).toEqual(expected);
    });
  });
});
