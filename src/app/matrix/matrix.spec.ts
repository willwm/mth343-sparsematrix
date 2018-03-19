import { Matrix } from './matrix';
import * as math from 'mathjs';

fdescribe('Matrix', () => {
  const defaultName = 'A';
  const defaultArray = [[1, 2], [3, 4]];

  it('should create an instance, and set instance properties accordingly', () => {
    const matrix = new Matrix(defaultArray, defaultName);
    expect(matrix).toBeTruthy();
    expect(matrix.name).toEqual(defaultName);
    expect(matrix.toArray()).toEqual(defaultArray);
  });

  it('should return expected result from toArray()', () => {
    const matrix = new Matrix(defaultArray, defaultName);
    expect(matrix.toArray()).toEqual(defaultArray);
  });

  it('should return expected JSON from toJSON()', () => {
    const matrix = new Matrix(defaultArray, defaultName);
    const json = matrix.toJSON();
    expect(json.mathjs).toEqual('SparseMatrix');
    expect(json.values).toEqual([1, 3, 2, 4]);
    expect(json.ptr).toEqual([0, 2, 4]);
    expect(json.size).toEqual([2, 2]);
    expect(json.index).toEqual([0, 1, 0, 1]);
  });

  it('should correctly multiplyBy() a scalar', () => {
    const matrix = new Matrix(defaultArray, defaultName);
    const result = matrix.multiplyBy(2);
    const resultArray = result.toArray();
    expect(resultArray).toEqual([[2, 4], [6, 8]]);
  });

  it('should correctly multiplyBy() an Array', () => {
    const matrix = new Matrix(defaultArray, defaultName);
    const result = matrix.multiplyBy([[2, 0], [0, 2]]);
    const resultArray = result.toArray();
    expect(resultArray).toEqual([[2, 4], [6, 8]]);
  });

  it('should return the matrix transpose from transpose(), and should not modify the original', () => {
    const matrix = new Matrix(defaultArray, defaultName);
    const transpose = matrix.transpose();
    expect(transpose.toArray()).toEqual([[1, 3], [2, 4]]);
    expect(matrix.toArray()).toEqual(defaultArray);
  });

  it('(A^T)T should equal A', () => {
    const matrix = new Matrix(defaultArray, defaultName);
    const transpose = matrix.transpose();
    expect(transpose.toArray()).toEqual([[1, 3], [2, 4]]);
    const involution = transpose.transpose();
    expect(involution.toArray()).toEqual(defaultArray);
  });

  it('should correctly determine symmetry from isSymmetric()', () => {
    const symmetric = [[1, 7, 3], [7, 4, -5], [3, -5, 6]];
    const nonSymmetric = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const sMatrix = new Matrix(symmetric, 'symmetric');
    const nsMatrix = new Matrix(nonSymmetric, 'non-symmetric');

    expect(sMatrix.isSymmetric()).toEqual(true);
    expect(nsMatrix.isSymmetric()).toEqual(false);
  });
});
