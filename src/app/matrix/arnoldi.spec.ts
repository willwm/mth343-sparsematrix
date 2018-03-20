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

    it('should let an m < n be assigned', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
      const arnoldi = new Arnoldi(A, 2);
      expect(arnoldi.m).toEqual(2);
    });

    it('should *not* let an m > n be assigned', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
      const arnoldi = new Arnoldi(A, 3);
      expect(arnoldi.m).toEqual(A.rows());
    });
  });

  describe('q1()', () => {
    it('should return a normalized v1', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
      const v1 = new Matrix([1, 0, 0], 'v1');
      const arnoldi = new Arnoldi(A);
      const q1 = arnoldi.q1(v1);
      expect(q1.toArray()).toEqual([1, 0, 0]);
    });
  });

  describe('q2', () => {
    it('should return a normalized v2 - q1t*v2*q1', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A');
      const q1 = new Matrix([1, 0, 0], 'q1');
      const v1 = new Matrix([1, 0, 0], 'v1');
      const arnoldi = new Arnoldi(A);

      const Aq1 = A.multiplyBy(q1, 'Aq1');
      const v2 = arnoldi.vk(A, q1, 2);
      expect(v2.toArray()).toEqual(Aq1.toArray());

      const q2 = arnoldi.q2(q1, v2);
      console.log(q2);
    });
  });

  describe('vk()', () => {
    it('should return A q_{k-1}', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6]], 'A');
      const q1 = new Matrix([1, 0, 0], 'q1');
      const Aq1 = A.multiplyBy(q1, 'Aq1');
      const arnoldi = new Arnoldi(A);

      const k = 2;
      const vk = arnoldi.vk(A, q1, k);
      expect(vk.toArray()).toEqual(Aq1.toArray());
    });
  });
});
