import { TestBed, inject } from '@angular/core/testing';

import { StringifyService } from './stringify.service';

describe('StringifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringifyService]
    });
  });

  it('should be created', inject([StringifyService], (service: StringifyService) => {
    expect(service).toBeTruthy();
  }));

  it('should return expected formatted string', inject([StringifyService], (service: StringifyService) => {
    const ja = { array: [1, 2, 3], b: [4, 5, 6] };
    const result = service.getPrettyCompact(ja);
    const expected = '{\n  "array": [1, 2, 3],\n  "b": [4, 5, 6]\n}';
    expect(result).toBe(expected);
  }));
});
