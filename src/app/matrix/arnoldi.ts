import { Matrix } from './matrix';

export class Arnoldi {
  private q: Array<Matrix>;
  private v: Array<Matrix>;
  private k = 0;
  readonly n: number;
  readonly m: number;
  readonly v1: Matrix;
  readonly q1: Matrix;

  constructor(readonly A: Matrix, _m?: number, _v1?: Matrix) {
    this.n = A.rows();
    this.m = (_m && _m < this.n) ? _m : this.n;
    if (!_v1) {
      this.v1 = new Matrix([1], 'v1');
      this.v1.resize([this.n], 0);
    }
    this.q1 = this.v1.normalize('q1');
  }

  q2(q1: Matrix, v2: Matrix): Matrix {
    const qtv2q = this.qtvkq(q1, v2, 2);
    const q2DeNorm = v2.subtractBy(qtv2q);
    const q2 = q2DeNorm.normalize('q2');
    return q2;
  }

  qtvkq(q: Matrix, vk: Matrix, k: number): Matrix {
    const qtvk = q.multiplyBy(vk); // (a scalar Matrix instance; q^t is a no-op for a vector, so it is skipped)
    const qtvkq = q.multiplyBy(qtvk, 'qtvkq');
    return qtvkq;
  }

  vk(A: Matrix, qPrev: Matrix, k: number): Matrix {
    const vk = A.multiplyBy(qPrev, `v${k}`);
    return vk;
  }

}
