import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestLockInterceptor } from '../core/interceptors/request-lock-interceptor';

export function provideRequestLock(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([requestLockInterceptor])),
  ]);
}
