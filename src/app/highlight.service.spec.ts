import { TestBed, inject } from '@angular/core/testing';

import { HighlightService } from './highlight.service';

describe('HighlightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightService]
    });
  });

  it('should be created', inject([HighlightService], (service: HighlightService) => {
    expect(service).toBeTruthy();
  }));
});
