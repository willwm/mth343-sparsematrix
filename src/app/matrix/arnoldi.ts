import { Matrix } from './matrix';

export class Arnoldi {
  private Q: Matrix[];
  private V: Matrix[];
  private k: number;
  readonly n: number;

  constructor(readonly A: Matrix, readonly m?: number, readonly v1?: Matrix) {
    this.n = A.rows();
    m = m || this.n;
    if (!v1) {
      v1 = new Matrix([1], 'v1');
      v1.resize([this.n], 0);
    }
  }


}
