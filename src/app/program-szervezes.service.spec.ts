import { TestBed } from '@angular/core/testing';

import { ProgramSzervezesService } from './program-szervezes.service';

describe('ProgramSzervezesService', () => {
  let service: ProgramSzervezesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramSzervezesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
