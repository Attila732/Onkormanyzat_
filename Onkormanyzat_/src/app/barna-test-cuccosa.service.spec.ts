import { TestBed } from '@angular/core/testing';

import { BarnaTestCuccosaService } from './barna-test-cuccosa.service';

describe('BarnaTestCuccosaService', () => {
  let service: BarnaTestCuccosaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarnaTestCuccosaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
