import { TestBed } from '@angular/core/testing';

import { CountryCodeService } from './country-code.service';

describe('CountryCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountryCodeService = TestBed.get(CountryCodeService);
    expect(service).toBeTruthy();
  });
});
