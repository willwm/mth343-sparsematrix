import { Arnoldi } from './arnoldi';
import { Matrix } from './matrix';

describe('Arnoldi', () => {

  describe('constructor()', () => {
    it('should create an instance', () => {
      const A = new Matrix([[1, 0], [0, 1]], 'A');
      expect(new Arnoldi(A)).toBeTruthy();
    });

    it('should create an instance with expected default values', () => {
      const A = new Matrix([[1, 0], [0, 1]], 'A');
      const arnoldi = new Arnoldi(A);
      expect(arnoldi).toBeTruthy();
      expect(arnoldi.A).toBe(A);
      expect(arnoldi.m).toEqual(A.rows());
      expect(arnoldi.n).toEqual(A.rows());
      expect(arnoldi.v1.toArray()).toEqual([1, 0]);
    });

    it('should only allow n x n matrices', () => {
      try {
        const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
        const arnoldi = new Arnoldi(A);
      } catch (error) {
        expect(error.message).toEqual('A must be an n x n matrix; you provided a 2 x 3 matrix.');
      }
    });

    it('should let an m < n be assigned', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A, 2);
      expect(arnoldi.m).toEqual(2);
    });

    it('should *not* let an m > n be assigned', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A, 4);
      expect(arnoldi.m).toEqual(A.rows());
    });

    it('should return a normalized v1 as q1', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A);
      const q1 = arnoldi.q1;
      expect(q1.toArray()).toEqual([1, 0, 0]);
    });
  });

  describe('getTridiagonal()', () => {
    it('should get T=(Q^T)AQ, for a given A and m', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A, 2);
      const T = arnoldi.getTridiagonal();
      expect(T.rows()).toEqual(2);
      expect(T.cols()).toEqual(2);
    });

    it('should get T=(Q^T)AQ, for a given A and omitted m', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A);
      const T = arnoldi.getTridiagonal();
      expect(T.rows()).toEqual(3);
      expect(T.cols()).toEqual(3);
    });

    it('should get T=(Q^T)AQ, for a given (slightly larger) A and omitted m', () => {
      // tslint:disable-next-line:max-line-length
      const array = [[204, 168, 133, 100, 70, 44, 23, 8], [168, 140, 112, 85, 60, 38, 20, 7], [133, 112, 91, 70, 50, 32, 17, 6], [100, 85, 70, 55, 40, 26, 14, 5], [70, 60, 50, 40, 30, 20, 11, 4], [44, 38, 32, 26, 20, 14, 8, 3], [23, 20, 17, 14, 11, 8, 5, 2], [8, 7, 6, 5, 4, 3, 2, 1]];
      const A = new Matrix(array, 'A');
      const arnoldi = new Arnoldi(A);
      const T = arnoldi.getTridiagonal();
      expect(T.rows()).toEqual(8);
      expect(T.cols()).toEqual(8);
    });
  });

  describe('iterate()', () => {
    it('should return the base case, if m <= 2', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A, 1);
      const Q = arnoldi.iterate();
      expect(Q.rows()).toEqual(3);
      expect(Q.cols()).toEqual(2);
    });

    it('should return Q, after m iterations, if 2 < m <= n', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A, 3);
      const Q = arnoldi.iterate();
      expect(Q.rows()).toEqual(3);
      expect(Q.cols()).toEqual(3);
    });
  });

  describe('q2()', () => {
    it('should return a normalized v2 - q1t*v2*q1', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const q1 = new Matrix([1, 0, 0], 'q1');
      const v1 = new Matrix([1, 0, 0], 'v1');
      const arnoldi = new Arnoldi(A);

      const Aq1 = A.multiplyBy(q1, 'Aq1');
      const v2 = arnoldi.vk(A, q1, 2);
      expect(v2.toArray()).toEqual(Aq1.toArray());

      const q2 = arnoldi.q2(q1, v2);
    });
  });

  describe('v2()', () => {
    it('should return Aq1 from v2()', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A);
      const q1 = arnoldi.q1;
      const v2 = arnoldi.v2(A, q1);
      const Aq1 = A.multiplyBy(q1);
      expect(v2.toArray()).toEqual(Aq1.toArray());
    });
  });

  describe('qk()', () => {
    it('should return a normalized (v2 - q1t*v2*q1), from qk(v2, [q1], 2)', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A);

      const q1 = arnoldi.q1;
      const v2 = arnoldi.vk(A, arnoldi.q1, 2);

      const qk = arnoldi.qk(v2, [q1], 2);
      const q2 = arnoldi.q2(q1, v2);
      expect(qk.toArray()).toEqual(q2.toArray());
    });
  });

  describe('vk()', () => {
    it('should return A q_{k-1}', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const arnoldi = new Arnoldi(A);
      const q1 = arnoldi.q1;

      const vk = arnoldi.vk(A, q1, 2);
      const v2 = arnoldi.v2(A, q1);
      expect(vk.toArray()).toEqual(v2.toArray());
    });
  });
});
