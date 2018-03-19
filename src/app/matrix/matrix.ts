import * as math from 'mathjs';

export type MathArray = number[] | number[][];
export type MathType = number|MathArray|Matrix;
export type MathExpression = string|string[]|MathArray|Matrix;

/**
 * Convenience wrapper for mathjs.Matrix for easier TypeScript consumption,
 * as the @types/mathjs.Matrix typedef does not match the current mathjs library spec.
 * @export
 * @class Matrix
 */
export class Matrix {
  private matrix: mathjs.Matrix;

  /**
   * Creates an instance of Matrix.
   * @param {(MathArray | mathjs.Matrix)} data
   * @param {('sparse' | 'dense')} [format]
   * @memberof Matrix
   */
  constructor(
    private data: MathArray | mathjs.Matrix,
    public name?: string
  ) {
    this.matrix = math.matrix(data);
  }

  /**
   * Convenience wrapper for math.matrix.toArray()
   * @returns {MathArray}
   * @memberof Matrix
   */
  toArray(): MathArray {
    return (this.matrix as any).toArray();
  }

  /**
   * Convenience wrapper for math.matrix.toJSON()
   * @returns {any} Returns the SparseMatrix version of this Matrix instance, as JSON.
   * @memberof Matrix
   */
  toJSON(): any {
    const sparse = math.sparse(this.matrix);
    return sparse.toJSON();
  }

  isSymmetric(): boolean {
    const transpose = math.transpose(this.matrix);
    const result = (math as any).compareNatural(transpose, this.matrix);
    return (result === 0);
  }

  /**
   * Convenience wrapper for math.multiply() that uses this Matrix instance as the first parameter.
   * @param {(MathArray | Matrix)} y
   * @returns {Matrix}
   * @memberof Matrix
   */
  multiplyBy(y: MathType): Matrix {
    const result = math.multiply(this.matrix, y);
    return new Matrix(result);
  }

  /**
   * Convenience wrapper for math.transpose()
   * @returns {Matrix}
   * @memberof Matrix
   */
  transpose(): Matrix {
    const result = math.transpose(this.matrix);
    return new Matrix(result);
  }
}
