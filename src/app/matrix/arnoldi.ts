import { Matrix } from './matrix';

export class Arnoldi {
  private q: Array<Matrix> = new Array<Matrix>();
  private v: Array<Matrix> = new Array<Matrix>();
  private k = 0;
  readonly n: number;
  readonly m: number;
  readonly v1: Matrix;
  readonly q1: Matrix;

  constructor(readonly A: Matrix, _m?: number) {
    this.n = A.rows();
    this.m = (_m && _m < this.n) ? _m : this.n;

    this.v1 = new Matrix([1], 'v1');
    this.v1.resize([this.n], 0);
    this.v[0] = this.v1;

    this.q1 = this.v1.normalize('q1');
    this.q[0] = this.q1;
  }

  iterate() {
    // Given: v1 (=v[0]), q1 (=q[0]) are already defined, and k = 0.

  }

  q2(q1: Matrix, v2: Matrix): Matrix {
    const qtv2q = this.qtvkq(q1, v2);
    const q2DeNorm = v2.subtractBy(qtv2q);
    const q2 = q2DeNorm.normalize('q2');
    return q2;
  }

  qk(vk: Matrix, qPrev: Array<Matrix>, k: number) {
    let qtvkqAccumulator: Matrix = null;
    for (const q of qPrev) {
      // TODO: Make this recursive, instead?
      const qtvkq = this.qtvkq(q, vk);
      if (qtvkqAccumulator === null) {
        qtvkqAccumulator = qtvkq;
      } else {
        qtvkqAccumulator = qtvkqAccumulator.addBy(qtvkq);
      }
    }
    const qkDeNormalized = vk.subtractBy(qtvkqAccumulator);
    const qk = qkDeNormalized.normalize(`q${k}`);
    return qk;
  }

  qtvkq(q: Matrix, vk: Matrix): Matrix {
    const qtvk = q.multiplyBy(vk); // (a scalar Matrix instance; q^t is a no-op for a vector, so it is skipped)
    const qtvkq = q.multiplyBy(qtvk, 'qtvkq');
    return qtvkq;
  }

  vk(A: Matrix, qPrev: Matrix, k: number): Matrix {
    const vk = A.multiplyBy(qPrev, `v${k}`);
    return vk;
  }

}
