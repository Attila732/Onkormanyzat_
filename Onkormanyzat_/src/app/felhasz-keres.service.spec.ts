import { TestBed } from '@angular/core/testing';

import { FelhaszKeresService } from './felhasz-keres.service';

describe('FelhaszKeresService', () => {
  let service: FelhaszKeresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FelhaszKeresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
