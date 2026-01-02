import { TestBed } from '@angular/core/testing';

import { ServiceSubTypesService } from './service-sub-types.service';

describe('ServiceSubTypesService', () => {
  let service: ServiceSubTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSubTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
