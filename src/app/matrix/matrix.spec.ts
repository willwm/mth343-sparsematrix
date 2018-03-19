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
});
