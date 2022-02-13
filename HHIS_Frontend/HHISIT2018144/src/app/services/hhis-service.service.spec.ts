import { TestBed } from '@angular/core/testing';

import { HhisServiceService } from './hhis-service.service';

describe('HhisServiceService', () => {
  let service: HhisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HhisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
