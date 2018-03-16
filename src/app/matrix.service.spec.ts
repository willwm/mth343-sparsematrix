import { TestBed, inject } from '@angular/core/testing';

import { MatrixService } from './matrix.service';
import { LatexService } from './latex.service';
import { StringifyService } from './stringify.service';

import * as math from 'mathjs';

describe('MatrixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatrixService, LatexService, StringifyService]
    });
  });

  it('should be created', inject([MatrixService], (service: MatrixService) => {
    expect(service).toBeTruthy();
  }));
});
