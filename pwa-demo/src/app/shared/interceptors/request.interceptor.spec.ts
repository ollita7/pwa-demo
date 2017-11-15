import { TestBed, inject } from '@angular/core/testing';

import { RequestInterceptor } from './request.interceptor';

describe('Request.InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestInterceptor]
    });
  });

  it('should be created', inject([RequestInterceptor], (service: RequestInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
