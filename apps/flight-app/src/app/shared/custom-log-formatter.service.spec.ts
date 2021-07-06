import { TestBed } from '@angular/core/testing';

import { CustomLogFormatterService } from './custom-log-formatter.service';

describe('CustomLogFormatterService', () => {
  let service: CustomLogFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomLogFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
