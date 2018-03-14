import { TestBed, inject } from '@angular/core/testing';

import { LatexService } from './latex.service';

describe('LatexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LatexService]
    });
  });

  it('should be created', inject([LatexService], (service: LatexService) => {
    expect(service).toBeTruthy();
  }));

  it('should generate a bmatrix string for a given array', inject([LatexService], (service: LatexService) => {
    const testArray = [[1, 0], [0, 1]];
    const expectedResult = '\\begin{bmatrix}\n  1 & 0 \\\\ \n  0 & 1 \\\\ \n\\end{bmatrix}\n';

    expect(service.getMatrix(testArray)).toBe(expectedResult);
  }));
});
