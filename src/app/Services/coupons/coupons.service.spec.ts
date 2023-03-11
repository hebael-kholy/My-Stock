import { TestBed } from '@angular/core/testing';

import { CouponsService } from './coupons.service';

describe('CouponsService', () => {
  let service: CouponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
