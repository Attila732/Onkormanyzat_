import { TestBed } from '@angular/core/testing';

import { KozteruletjelentesService } from './kozteruletjelentes.service';

describe('KozteruletjelentesService', () => {
  let service: KozteruletjelentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KozteruletjelentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
