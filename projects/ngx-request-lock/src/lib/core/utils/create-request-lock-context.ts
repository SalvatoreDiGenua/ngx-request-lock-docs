import { HttpContext } from '@angular/common/http';
import { REQUEST_LOCK_ID } from '../tokens/request-lock-token';

/**
 * Creates an Angular `HttpContext` containing the `REQUEST_LOCK_ID` token.
 *
 * Pass this context in your `HttpClient` call options to associate the request with a lock:
 * ```ts
 * this.http.get('/api/resource', {
 *   context: createRequestLockContext(lock.requestId())
 * });
 * ```
 *
 * @param id The tracking lock identifier (e.g. from `RequestLockDirective.requestId()`).
 * @returns A configured `HttpContext` instance.
 */
export function createRequestLockContext(id: string): HttpContext {
  const context = new HttpContext();
  if (!id) {
    return context;
  }
  return context.set(REQUEST_LOCK_ID, id);
}

