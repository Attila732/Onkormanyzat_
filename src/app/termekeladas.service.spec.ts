import { TestBed } from '@angular/core/testing';

import { TermekeladasService } from './termekeladas.service';

describe('TermekeladasService', () => {
  let service: TermekeladasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermekeladasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
