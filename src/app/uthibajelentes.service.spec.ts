import { TestBed } from '@angular/core/testing';

import { UthibajelentesService } from './uthibajelentes.service';

describe('UthibajelentesService', () => {
  let service: UthibajelentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UthibajelentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
