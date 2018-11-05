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
});
