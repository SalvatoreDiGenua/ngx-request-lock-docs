import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { requestLockInterceptor } from '../core/interceptors/request-lock-interceptor';

/**
 * Registers `HttpClient` configured with the functional `requestLockInterceptor`.
 *
 * Add this to the `providers` array in your `ApplicationConfig`:
 * ```ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideRequestLock(),
 *     // Do not call provideHttpClient() separately
 *   ]
 * };
 * ```
 */
export function provideRequestLock(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([requestLockInterceptor])),
  ]);
}
