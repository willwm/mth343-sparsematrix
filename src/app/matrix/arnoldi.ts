import { Matrix } from './matrix';

export class Arnoldi {
  private q: Array<Matrix>;
  private v: Array<Matrix>;
  private k = 0;
  readonly n: number;
  readonly m: number;
  readonly v1: Matrix;

  constructor(readonly A: Matrix, _m?: number, _v1?: Matrix) {
    this.n = A.rows();
    this.m = (_m && _m < this.n) ? _m : this.n;
    if (!_v1) {
      this.v1 = new Matrix([1], 'v1');
      this.v1.resize([this.n], 0);
    }
  }

  q1(v1: Matrix): Matrix {
    const q1 = v1.normalize('q1');
    return q1;
  }

  q2(q1: Matrix, v2: Matrix) {
    const qtv2 = q1.multiplyBy(v2); // Should be a scalar...
    const qtv2q = q1.multiplyBy(qtv2); // Since qtv2 is a scalar, call the multiplyBy on q1 instead.
    const q2DeNorm = v2.subtractBy(qtv2q);
    const q2 = q2DeNorm.normalize('q2');
    return q2;
  }

  vk(A: Matrix, qPrev: Matrix, k: number): Matrix {
    const vk = A.multiplyBy(qPrev, `v${k}`);
    return vk;
  }

}
