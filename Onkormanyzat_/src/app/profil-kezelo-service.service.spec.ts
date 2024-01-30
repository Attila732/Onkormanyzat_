import { TestBed } from '@angular/core/testing';

import { ProfilKezeloServiceService } from './profil-kezelo-service.service';

describe('ProfilKezeloServiceService', () => {
  let service: ProfilKezeloServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilKezeloServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
