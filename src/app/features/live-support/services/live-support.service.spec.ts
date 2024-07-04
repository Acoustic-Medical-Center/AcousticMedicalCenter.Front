import { TestBed } from '@angular/core/testing';

import { LiveSupportService } from './live-support.service';

describe('LiveSupportService', () => {
  let service: LiveSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
