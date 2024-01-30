import { TestBed } from '@angular/core/testing';

import { SzervezesService } from './szervezes.service';

describe('SzervezesserviceService', () => {
  let service: SzervezesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SzervezesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
