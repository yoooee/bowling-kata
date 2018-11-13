import { Frame } from './frame';

describe('Frame', () => {
  describe('total', () => {
    it('returns the total of all rolls for a given frame', () => {
      const frame: Frame = new Frame(2, 3);
      const subject: number = frame.total;
      const expected: number = 5;

      expect(subject).toEqual(expected);
    });
  });
});
