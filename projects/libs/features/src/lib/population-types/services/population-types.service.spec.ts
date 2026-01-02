import { TestBed } from '@angular/core/testing';

import { PopulationTypesService } from './population-types.service';

describe('PopulationTypesService', () => {
  let service: PopulationTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulationTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
