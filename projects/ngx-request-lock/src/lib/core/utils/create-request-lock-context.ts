import { HttpContext } from '@angular/common/http';
import { REQUEST_LOCK_ID } from '../tokens/request-lock-token';

export const createRequestLockContext = (id: string): HttpContext => {
  const context = new HttpContext();
  if (!id) {
    return context;
  }
  return context.set(REQUEST_LOCK_ID, id);
};
