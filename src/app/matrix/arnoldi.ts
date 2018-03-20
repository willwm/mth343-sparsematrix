import { Matrix } from './matrix';

export class Arnoldi {
  private Q: Matrix[];
  private V: Matrix[];
  private k: number;
  readonly n: number;
  readonly m: number;
  readonly v1: Matrix;

  constructor(readonly A: Matrix, _m?: number, _v1?: Matrix) {
    this.n = A.rows();
    this.m = _m || this.n;
    if (!_v1) {
      this.v1 = new Matrix([1], 'v1');
      this.v1.resize([this.n], 0);
    }
  }


}
