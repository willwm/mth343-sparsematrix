import * as math from 'mathjs';

export type MathArray = number[] | number[][];
export type MathType = number | MathArray | mathjs.Matrix;
export type MathExpression = string | string[] | MathArray;

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
   * @param {(string | MathType)} data If a {string} is supplied, it will be parsed as JSON
   * @param {string} name (Optional) name to assign to this Matrix instance
   * @memberof Matrix
   */
  constructor(
    private data: string | MathType,
    public name?: string
  ) {
    const mData = typeof data === 'string' ? JSON.parse(data) : data;
    this.matrix = math.matrix(mData);
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
    return result === 0;
  }

  isVector(): boolean {
    const size = this.matrix.size();
    const length = size.length;
    return (length === 1 || (length === 2 && size[0] === 1));
  }

  /**
   * Convenience wrapper for math.multiply() that uses this Matrix instance as the first parameter.
   * @param {(MathArray | Matrix)} matrix
   * @param {string} name (Optional) name to assign to the result Matrix instance
   * @returns {Matrix}
   * @memberof Matrix
   */
  multiplyBy(matrix: MathType | Matrix, name?: string): Matrix {
    const y = matrix instanceof Matrix ? matrix.toArray() : matrix;
    const result = math.multiply(this.matrix, y);
    return new Matrix(result, name);
  }
  /**
   * Convenience wrapper for math.norm() that uses this Matrix instance as the first parameter.
   * @param {string} name (Optional) name to assign to the result Matrix instance
   * @returns {number}
   * @memberof Matrix
   */
  norm(name?: string): number {
    const result = math.norm(this.matrix);
    return result as number;
  }

  /**
   * Constructs the unit vector (L2-norm),
   * from dividing this.matrix by math.norm(this.matrix)
   * @param {string} [name] (Optional) name to assign to the result Matrix instance
   * @returns {Matrix}
   * @memberof Matrix
   */
  normalize(name?: string): Matrix {
    const l2Norm = math.norm(this.matrix);
    const result = math.divide(this.matrix, l2Norm) as mathjs.Matrix;
    return new Matrix(result, name);
  }

  /**
   * Convenience wrapper for math.qr();
   * auto-converts to DenseMatrix, as math.qr() doesn't currently work with SparseMatrix.
   * @returns {any} An object with properties Q and R, corresponding to their respective Matrix.
   * @memberof Matrix
   */
  qr(): any {
    const dense = math.matrix(this.matrix, 'dense');
    const qr = (math as any).qr(dense);
    const qrArray = {
      Q: new Matrix(qr.Q, 'Q'),
      R: new Matrix(qr.R, 'R')
    };
    return qrArray;
  }

  /**
   * Convenience wrapper for this.matrix.size()
   * @returns {number[]}
   * @memberof Matrix
   */
  size(): number[] {
    const size = this.matrix.size();
    return size;
  }

  /**
   * Convenience wrapper for math.transpose()
   * @param {string} name (Optional) name to assign to the result Matrix instance
   * @returns {Matrix}
   * @memberof Matrix
   */
  transpose(name?: string): Matrix {
    const result = math.transpose(this.matrix);
    return new Matrix(result, name);
  }
}