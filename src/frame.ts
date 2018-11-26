export class Frame {
  private _total: number = 0;

  constructor(
    private _index: number,
    private _roll1: number = 0,
    private _roll2: number = 0,
    private _roll3: number = 0) {
    this._total = _roll1 + _roll2 + _roll3;
  }

  get index(): number {
    return this._index;
  }

  get roll1(): number {
    return this._roll1;
  }

  get roll2(): number {
    return this._roll2;
  }

  get roll3(): number {
    return this._roll3;
  }

  get total(): number {
    return this._total;
  }
}
