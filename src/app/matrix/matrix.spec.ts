import { Matrix } from './matrix';
import * as math from 'mathjs';

fdescribe('Matrix', () => {
  describe('constructor()', () => {
    it('should create an instance from an Array and string, and set instance properties accordingly', () => {
      const matrix = new Matrix([[1, 2], [3, 4]], 'A');
      expect(matrix).toBeTruthy();
      expect(matrix.name).toEqual('A');
      expect(matrix.toArray()).toEqual([[1, 2], [3, 4]]);
    });

    it('should create an instance from a string and string, and set instance properties accordingly', () => {
      const json = '[[1, 2], [3, 4]]';
      const matrix = new Matrix(json, 'A');
      expect(matrix).toBeTruthy();
      expect(matrix.name).toEqual('A');
      expect(matrix.toArray()).toEqual([[1, 2], [3, 4]]);
    });
  });

  describe('(static) concat()', () => {
    it('should combine Array<Matrix> into a single, combined Matrix', () => {
      const matrices = [
        new Matrix([1, 2, 3], 'v1'),
        new Matrix([4, 5, 6], 'v2'),
        new Matrix([7, 8, 9], 'v3')
      ];
      const concat = Matrix.concat(matrices, 'A');
      expect(concat.name).toEqual('A');
      expect(concat.toArray()).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    });
  });

  describe('get', () => {
    it('should return expected result for a given vector index', () => {
      const v = new Matrix([1, 2, 3], 'v');
      const result = v.get([2]); // get() is zero-based

      expect(result).toEqual(3);
    });

    it('should return expected result for a given matrix index', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
      const result = A.get([1, 1]); // get() is zero-based

      expect(result).toEqual(5);
    });
  });

  describe('set', () => {
    it('should set expected value for a given vector index and value', () => {
      const v = new Matrix([1, 2, 3], 'v');
      v.set([2], 7);
      const result = v.get([2]); // get() is zero-based

      expect(result).toEqual(7);
    });

    it('should set expected value for a given matrix index and value', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
      A.set([1, 1], 9);
      const result = A.get([1, 1]); // get() is zero-based

      expect(result).toEqual(9);
    });
  });

  describe('resize()', () => {
    it('should expand a vector for a given new size and defaultValue', () => {
      const v = new Matrix([1, 2, 3], 'v');
      v.resize([5], 0);

      expect(v.toArray()).toEqual([1, 2, 3, 0, 0]);
    });

    it('should reduce a vector for a given new size and defaultValue', () => {
      const v = new Matrix([1, 2, 3, 4, 5], 'v');
      v.resize([3]);

      expect(v.toArray()).toEqual([1, 2, 3]);
    });
  });

  fdescribe('flatten()', () => {
    it('should flatten a 2D array to an expected 1D array', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
      const flat = A.flatten();
      expect(flat).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('toArray()', () => {
    it('should return expected result from toArray()', () => {
      const matrix = new Matrix([[1, 2], [3, 4]], 'A');
      expect(matrix.toArray()).toEqual([[1, 2], [3, 4]]);
    });
  });

  describe('toJSON()', () => {
    it('should return expected (sparse) JSON from toJSON()', () => {
      const matrix = new Matrix([[1, 2], [3, 4]], 'A');
      const json = matrix.toJSON();
      expect(json.mathjs).toEqual('SparseMatrix');
      expect(json.values).toEqual([1, 3, 2, 4]);
      expect(json.ptr).toEqual([0, 2, 4]);
      expect(json.size).toEqual([2, 2]);
      expect(json.index).toEqual([0, 1, 0, 1]);
    });
  });

  describe('addBy()', () => {
    it('should correctly addBy() a vector', () => {
      const v = new Matrix([1, 2, 3], 'v');
      const result = v.addBy(v);
      expect(result.toArray()).toEqual([2, 4, 6]);
    });
  });

  describe('subtractBy()', () => {
    it('should correctly subtractBy() a vector', () => {
      const v = new Matrix([1, 2, 3], 'v');
      const result = v.subtractBy(v);
      expect(result.toArray()).toEqual([0, 0, 0]);
    });
  });

  describe('multiplyBy()', () => {
    it('should correctly multiplyBy() a scalar', () => {
      const matrix = new Matrix([[1, 2], [3, 4]], 'A');
      const result = matrix.multiplyBy(2);
      const resultArray = result.toArray();
      expect(resultArray).toEqual([[2, 4], [6, 8]]);
    });

    it('should correctly multiplyBy() a vector', () => {
      const matrix = new Matrix([[1, 2], [3, 4]], 'A');
      const vector = new Matrix([2, 2], 'v');
      const result = matrix.multiplyBy(vector, 'Av');
      const resultArray = result.toArray();
      expect(resultArray).toEqual([6, 14]);
    });

    it('should correctly multiplyBy() an Array', () => {
      const matrix = new Matrix([[1, 2], [3, 4]], 'A');
      const result = matrix.multiplyBy([[2, 0], [0, 2]]);
      const resultArray = result.toArray();
      expect(resultArray).toEqual([[2, 4], [6, 8]]);
    });

    it('should correctly multiplyBy() another (2D) Matrix instance', () => {
      const A = new Matrix([[1, 2], [3, 4]], 'A');
      const B = new Matrix([[2, 0], [0, 2]], 'B');
      const result = A.multiplyBy(B, 'C');
      expect(result.toArray()).toEqual([[2, 4], [6, 8]]);
    });

    it('should correctly multiplyBy() another (scalar) Matrix instance', () => {
      const A = new Matrix([[1, 2], [3, 4]], 'A');
      const B = new Matrix(2, 'B');
      const result = A.multiplyBy(B, 'C');
      expect(result.toArray()).toEqual([[2, 4], [6, 8]]);
    });
  });

  describe('norm()', () => {
    it('should calculate the norm() for a vector', () => {
      const v = new Matrix([1, 2, 3], 'v');
      const vNorm = v.norm('||v||');
      expect(vNorm).toEqual(math.sqrt(14));
    });
  });

  describe('normalize()', () => {
    it('should correctly normalize() a vector', () => {
      const v = new Matrix([1, 2, 3], 'v');
      const vNorm = v.norm('||v||');
      const normalized = v.normalize('normalized');
      expect(normalized.toArray()).toEqual([1 / vNorm, 2 / vNorm, 3 / vNorm]);
    });
  });

  describe('transpose()', () => {
    it('should return the matrix transpose from transpose(), and should not modify the original', () => {
      const matrix = new Matrix([[1, 2], [3, 4]], 'A');
      const transpose = matrix.transpose();
      expect(transpose.toArray()).toEqual([[1, 3], [2, 4]]);
      expect(matrix.toArray()).toEqual([[1, 2], [3, 4]]);
    });

    it('for a matrix A, (A^T)T should equal A', () => {
      const matrix = new Matrix([[1, 2], [3, 4]], 'A');
      const transpose = matrix.transpose();
      expect(transpose.toArray()).toEqual([[1, 3], [2, 4]]);
      const involution = transpose.transpose();
      expect(involution.toArray()).toEqual([[1, 2], [3, 4]]);
    });
  });

  describe('isSymmetric()', () => {
    it('should correctly determine symmetry from isSymmetric()', () => {
      const symmetric = [[1, 7, 3], [7, 4, -5], [3, -5, 6]];
      const sMatrix = new Matrix(symmetric, 'symmetric');
      expect(sMatrix.isSymmetric()).toEqual(true);
    });

    it('should correctly determine when a matrix is *not* symmetric', () => {
      const nonSymmetric = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
      const nsMatrix = new Matrix(nonSymmetric, 'non-symmetric');
      expect(nsMatrix.isSymmetric()).toEqual(false);
    });
  });

  describe('size()', () => {
    it('should return the correct size() for a vector', () => {
      const v = new Matrix([1, 2, 3], 'v');
      const size = v.size();
      expect(size).toEqual([3]);
    });

    it('should return the correct size() for a matrix', () => {
      const A = new Matrix([[1, 2], [3, 4]], 'A');
      const size = A.size();
      expect(size).toEqual([2, 2]);
    });
  });

  describe('isVector()', () => {
    it('should correctly determine if the Matrix instance is a vector', () => {
      const v = new Matrix([1, 2, 3], 'v');
      expect(v.isVector()).toEqual(true);

      const vT = v.transpose('v^T');
      expect(vT.isVector()).toEqual(true);
    });

    it('should correctly determine if the Matrix instance is *not* a vector', () => {
      const A = new Matrix([[1, 2], [3, 4]], 'A');
      expect(A.isVector()).toEqual(false);
    });
  });

  describe('rows()', () => {
    it('should return the correct count of rows for a matrix', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
      const AT = A.transpose('A^T');

      expect(A.rows()).toEqual(2);
      expect(AT.rows()).toEqual(3);
    });

    it('should return the correct number of rows for a vector', () => {
      const v = new Matrix([1, 2, 3], 'v');
      const vT = v.transpose('v^T'); // Note: transpose() is a no-op on vectors and scalars.

      expect(v.rows()).toEqual(1);
      expect(vT.rows()).toEqual(1);
    });
  });
});
