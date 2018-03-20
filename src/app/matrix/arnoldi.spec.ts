import { Arnoldi } from './arnoldi';
import { Matrix } from './matrix';

describe('Arnoldi', () => {
  it('should create an instance', () => {
    const A = new Matrix([[1, 0], [0, 1]], 'A');
    expect(new Arnoldi(A)).toBeTruthy();
  });
});
