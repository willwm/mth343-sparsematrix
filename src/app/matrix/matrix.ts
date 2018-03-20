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
  protected matrix: mathjs.Matrix;

  /**
   * Creates an instance of Matrix.
   * @param {(string | MathType)} data If a {string} is supplied, it will be parsed as JSON
   * @param {string} name (Optional) name to assign to this Matrix instance
   * @memberof Matrix
   */
  constructor(
    protected data: string | MathType,
    readonly name?: string
  ) {
    if (typeof data === 'number') {
      this.matrix = math.matrix([data]);
    } else if (typeof data === 'string') {
      const json = JSON.parse(data);
      this.matrix = math.matrix(json);
    } else {
      this.matrix = math.matrix(data);
    }
  }

  get(index: Array<number>): number {
    const result = this.matrix.get(index);
    return result as number;
  }

  set(index: Array<number>, value: number): void {
    this.matrix.set(index, value);
  }

  resize(newSize: Array<number>, defaultValue?: number): void {
    defaultValue = defaultValue || 0;
    this.matrix.resize(newSize, defaultValue);
  }

  rows(): number {
    const size = this.size();
    return (size.length === 1) ? 1 : size[0];
  }

  cols(): number {
    const size = this.size();
    return (size.length === 1) ? size[0] : size[1];
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

  isScalar(): boolean {
    return (this.rows() === 1 && this.cols() === 1);
  }

  addBy(matrix: MathType | Matrix, name?: string): Matrix {
    const y = matrix instanceof Matrix ? matrix.toArray() : matrix;
    const result = math.add(this.matrix, y);
    return new Matrix(result as mathjs.Matrix, name);
  }

  subtractBy(matrix: MathType | Matrix, name?: string): Matrix {
    const y = matrix instanceof Matrix ? matrix.toArray() : matrix;
    const result = math.subtract(this.matrix, y);
    return new Matrix(result as mathjs.Matrix, name);
  }

  /**
   * Convenience wrapper for math.multiply() that uses this Matrix instance as the first parameter.
   * @param {(MathArray | Matrix)} matrix
   * @param {string} name (Optional) name to assign to the result Matrix instance
   * @returns {Matrix}
   * @memberof Matrix
   */
  multiplyBy(matrix: MathType | Matrix, name?: string): Matrix {
    if (matrix instanceof Matrix) {
      if (matrix.isScalar()) {
        const scalar = matrix.get([0]);
        const sResult = math.multiply(this.matrix, scalar);
        return new Matrix(sResult, name);
      } else {
        const mResult = math.multiply(this.matrix, matrix.toArray());
        return new Matrix(mResult, name);
      }
    }

    const result = math.multiply(this.matrix, matrix);
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
   * Note: Only works with 2d+ matrices/arrays; 1d matrices/arrays (vectors) are returned unchanged.
   * @param {string} name (Optional) name to assign to the result Matrix instance
   * @returns {Matrix} Transpose of a 2d+ matrix; vectors are returned unmodified.
   * @memberof Matrix
   */
  transpose(name?: string): Matrix {
    const result = math.transpose(this.matrix);
    return new Matrix(result, name);
  }
}
