import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { REQUEST_LOCK_ID } from '../tokens/request-lock-token';
import { RequestLockService } from '../services/request-lock-service';

export const requestLockInterceptor: HttpInterceptorFn = (req, next) => {
  const trackingId = req.context.get(REQUEST_LOCK_ID);

  if (!trackingId) {
    return next(req);
  }

  const trackingService = inject(RequestLockService);
  trackingService.start(trackingId);

  return next(req).pipe(
    finalize(() => {
      trackingService.end(trackingId);
    }),
  );
};
