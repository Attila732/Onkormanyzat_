import { TestBed } from '@angular/core/testing';

import { TermekkezeloService } from './termekkezelo.service';

describe('TermekkezeloService', () => {
  let service: TermekkezeloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermekkezeloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
