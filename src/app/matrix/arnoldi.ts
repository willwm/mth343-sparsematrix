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
    if (A.cols() !== A.rows()) {
      throw new Error((`A must be an n x n matrix; you provided a ${A.rows()} x ${A.cols()} matrix.`));
    }

    this.n = A.rows();
    this.m = (_m && _m < this.n) ? _m : this.n;

    this.v1 = new Matrix([1], 'v1');
    this.v1.resize([this.n], 0);
    this.v[0] = this.v1;

    this.q1 = this.v1.normalize('q1');
    this.q[0] = this.q1;

    this.v[1] = this.v2();
    this.q[1] = this.q2(this.q1, this.v[1]);
    this.k = 2;
  }

  getTridiagonal(): Matrix {
    const Q = this.iterate();
    const Qt = Q.transpose('Q^T');
    const QtA = Qt.multiplyBy(this.A);
    const QtAQ = QtA.multiplyBy(Q);

    return QtAQ;
  }

  iterate(m = this.m, k = this.k): Matrix {
    // Given: v1 (=v[0]), q1 (=q[0]), v2 (=v[1]), q2 (=q[0]) are defined and k = 2.

    for (k; k < m; k++) {
      const vk = this.vk(this.A, this.q[k - 1]);
      const qk = this.qk(vk, this.q);
      this.v[k] = vk;
      this.q[k] = qk;
    }

    const Qt = Matrix.concat(this.q, 'Q^T');
    return Qt.transpose('Q');
  }

  q2(q1 = this.q1, v2: Matrix): Matrix {
    const qtv2q = this.qtvkq(q1, v2);
    const q2DeNorm = v2.subtractBy(qtv2q);
    const q2 = q2DeNorm.normalize('q2');
    return q2;
  }

  v2(A = this.A, q1 = this.q1): Matrix {
    const v2 = A.multiplyBy(q1, 'v2');
    return v2;
  }

  qk(vk: Matrix, qPrev: Array<Matrix>, k = this.k) {
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

  vk(A: Matrix, qPrev: Matrix, k = this.k): Matrix {
    const vk = A.multiplyBy(qPrev, `v${k}`);
    return vk;
  }

}
