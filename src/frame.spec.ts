import { Frame } from './frame';

describe('Frame', () => {
  describe('total', () => {
    it('returns 5 when given a roll of 2 and 3', () => {
      const frame: Frame = new Frame(2, 3);
      const subject: number = frame.total;
      const expected: number = 5;

      expect(subject).toEqual(expected);
    });

    it('returns 10 when given a roll of 10', () => {
      const frame: Frame = new Frame(10);
      const subject: number = frame.total;
      const expected: number = 10;

      expect(subject).toEqual(expected);
    });

    it('returns 10 when given a spare', () => {
      const frame: Frame = new Frame(2, 8);
      const subject: number = frame.total;
      const expected: number = 10;

      expect(subject).toEqual(expected);
    });

    it('returns 30 when given three strikes', () => {
      const frame: Frame = new Frame(10, 10, 10);
      const subject: number = frame.total;
      const expected: number = 30;

      expect(subject).toEqual(expected);
    });
  });
});
