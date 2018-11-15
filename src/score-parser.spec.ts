import { ScoreParser } from './score-parser';

describe('ScoreParser', () => {
  describe('getRollValue', () => {
    it('should return a 0 when supplied with a gutter (-)', () => {
      let scoreParser = new ScoreParser('11 11 11 11 11 11 11 11 11 111');
      expect(scoreParser.getRollValue('-')).toEqual(0);
      expect(scoreParser.getRollValue('/')).toEqual(10);
      expect(scoreParser.getRollValue('X')).toEqual(10);
    });
  });
});
