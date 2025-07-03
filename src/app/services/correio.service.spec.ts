import { TestBed } from '@angular/core/testing';

import { CorreioService } from './correio.service';

describe('CorreioService', () => {
  let service: CorreioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
