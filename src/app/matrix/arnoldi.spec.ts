import { Arnoldi } from './arnoldi';
import { Matrix } from './matrix';

fdescribe('Arnoldi', () => {

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
  });
});
