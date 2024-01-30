import { TestBed } from '@angular/core/testing';

import { JelenteskezeloService } from './jelenteskezelo.service';

describe('JelenteskezeloService', () => {
  let service: JelenteskezeloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JelenteskezeloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
