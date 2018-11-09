import { BowlingGame } from './index';

describe('Bowling', () => {
  let bowlingGame: BowlingGame;

  beforeEach(() => {
    bowlingGame = new BowlingGame();
  });

  describe('all strikes', () => {
    it('should return a score of 300', () => {
      let GameScore = 'X X X X X X X X X XXX';
      let expected = 300;
      let actual = bowlingGame.getScore(GameScore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all gutter balls', () => {
    it('should return a score of 0', () => {
      let GameScore = '-- -- -- -- -- -- -- -- -- --';
      let expected = 0;
      let actual = bowlingGame.getScore(GameScore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all 9s for roll 1 and gutter balls for roll 2', () => {
    it('should return a score of 90', () => {
      let gamescore = '9- 9- 9- 9- 9- 9- 9- 9- 9- 9-';
      let expected = 90;
      let actual = bowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all 5s for roll 1 and 2s for roll 2', () => {
    it('should return a score of 90', () => {
      let gamescore = '52 52 52 52 52 52 52 52 52 52';
      let expected = 70;
      let actual = bowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all 5s and one spare', () => {
    it('should return a score of 60', () => {
      let gamescore = '5/ 50 50 50 50 50 50 50 50 50';
      let expected = 60;
      let actual = bowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  describe('all 5s and all spares except final frame', () => {
    it('should return a score of 140', () => {
      let gamescore = '5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 5/ 50';
      let expected = 140;
      let actual = bowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  describe('veriety of values and all spares except final frame', () => {
    it('should return a score of 144', () => {
      let gamescore = '1/ 2/ 3/ 4/ 5/ 6/ 7/ 8/ 9/ 50';
      let expected = 144;
      let actual = bowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  describe('veriety of values and all spares including final frame', () => {
    it('should return a score of 158', () => {
      let gamescore = '1/ 2/ 3/ 4/ 5/ 6/ 7/ 8/ 9/ 5/9';
      let expected = 158;
      let actual = bowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  xdescribe('all 2s for roll 1 and spares for roll 2', () => {
    it('should return a score of 120', () => {
      let gamescore = '2/ 2/ 2/ 2/ 2/ 2/ 2/ 2/ 2/ 2/2';
      let expected = 120;
      let actual = bowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });

  xdescribe('a variety of standard scores with strikes', () => {
    it('should return a score of 150', () => {
      let gamescore = '54 72 9- X 81 X X 81 9- XXX';
      let expected = 150;
      let actual = bowlingGame.getScore(gamescore);

      expect(actual).toEqual(expected);
    });
  });
});
