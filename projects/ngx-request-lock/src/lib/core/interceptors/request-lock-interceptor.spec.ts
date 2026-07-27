import { TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { requestLockInterceptor } from './request-lock-interceptor';
import { RequestLockService } from '../services/request-lock-service';
import { createRequestLockContext } from '../utils/create-request-lock-context';

function runInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  return TestBed.runInInjectionContext(() => requestLockInterceptor(req, next));
}

describe('requestLockInterceptor', () => {
  let service: RequestLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestLockService);
  });

  it('passes the request through untouched when no context id is set', () => {
    const req = new HttpRequest('GET', '/api/passthrough');
    const nextResponse = new HttpResponse({ status: 200 });
    const next: HttpHandlerFn = vi
      .fn()
      .mockReturnValue(of(nextResponse as HttpEvent<unknown>));

    const startSpy = vi.spyOn(service, 'start');
    const endSpy = vi.spyOn(service, 'end');

    let received: HttpEvent<unknown> | undefined;
    runInterceptor(req, next).subscribe((event) => {
      received = event;
    });

    expect(received).toBe(nextResponse);
    expect(startSpy).not.toHaveBeenCalled();
    expect(endSpy).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledOnce();
  });

  it('calls start and end when the request carries a lock id (success)', () => {
    const startSpy = vi.spyOn(service, 'start');
    const endSpy = vi.spyOn(service, 'end');

    const req = new HttpRequest('POST', '/api/save', null, {
      context: createRequestLockContext('flow-a'),
    });
    const next: HttpHandlerFn = () =>
      of({ type: HttpEventType.Response } as HttpEvent<unknown>);

    runInterceptor(req, next).subscribe();

    expect(startSpy).toHaveBeenCalledExactlyOnceWith('flow-a');
    expect(endSpy).toHaveBeenCalledExactlyOnceWith('flow-a');
    expect(service.isPending('flow-a')()).toBe(false);
  });

  it('calls end on error paths', () => {
    const startSpy = vi.spyOn(service, 'start');
    const endSpy = vi.spyOn(service, 'end');

    const req = new HttpRequest('GET', '/api/fail', {
      context: createRequestLockContext('flow-err'),
    });
    const err = new HttpErrorResponse({ status: 500 });
    const next: HttpHandlerFn = () => throwError(() => err);

    runInterceptor(req, next).subscribe({
      next: () => undefined,
      error: () => undefined,
    });

    expect(startSpy).toHaveBeenCalledExactlyOnceWith('flow-err');
    expect(endSpy).toHaveBeenCalledExactlyOnceWith('flow-err');
    expect(service.isPending('flow-err')()).toBe(false);
  });

  it('calls end on unsubscription before the request completes', () => {
    const startSpy = vi.spyOn(service, 'start');
    const endSpy = vi.spyOn(service, 'end');

    const source = new Subject<HttpEvent<unknown>>();
    const req = new HttpRequest('GET', '/api/hang', {
      context: createRequestLockContext('flow-cancel'),
    });
    const next: HttpHandlerFn = () => source.asObservable();

    const sub = runInterceptor(req, next).subscribe();
    expect(startSpy).toHaveBeenCalledExactlyOnceWith('flow-cancel');
    expect(service.isPending('flow-cancel')()).toBe(true);

    sub.unsubscribe();
    expect(endSpy).toHaveBeenCalledExactlyOnceWith('flow-cancel');
    expect(service.isPending('flow-cancel')()).toBe(false);
  });

  it('reference-counts across multiple concurrent requests with the same id', () => {
    const req = (): HttpRequest<unknown> =>
      new HttpRequest('GET', '/api/multi', {
        context: createRequestLockContext('shared-flow'),
      });

    const s1 = new Subject<HttpEvent<unknown>>();
    const s2 = new Subject<HttpEvent<unknown>>();

    runInterceptor(req(), () => s1.asObservable()).subscribe();
    runInterceptor(req(), () => s2.asObservable()).subscribe();

    const pending = service.isPending('shared-flow');
    expect(pending()).toBe(true);

    s1.complete();
    expect(pending()).toBe(true);

    s2.complete();
    expect(pending()).toBe(false);
  });
});
