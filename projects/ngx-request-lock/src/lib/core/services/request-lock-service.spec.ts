import { TestBed } from '@angular/core/testing';
import { RequestLockService } from './request-lock-service';

describe('RequestLockService', () => {
  let service: RequestLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestLockService);
  });

  it('returns false for an unknown id', () => {
    expect(service.isPending('unknown')()).toBe(false);
  });

  it('flips isPending to true on start and back to false on end', () => {
    const pending = service.isPending('a');
    expect(pending()).toBe(false);

    service.start('a');
    expect(pending()).toBe(true);

    service.end('a');
    expect(pending()).toBe(false);
  });

  it('reference-counts multiple starts per id', () => {
    const pending = service.isPending('flow');

    service.start('flow');
    service.start('flow');
    service.start('flow');
    expect(pending()).toBe(true);

    service.end('flow');
    expect(pending()).toBe(true);

    service.end('flow');
    expect(pending()).toBe(true);

    service.end('flow');
    expect(pending()).toBe(false);
  });

  it('keeps ids independent from each other', () => {
    const a = service.isPending('a');
    const b = service.isPending('b');

    service.start('a');
    expect(a()).toBe(true);
    expect(b()).toBe(false);

    service.start('b');
    expect(a()).toBe(true);
    expect(b()).toBe(true);

    service.end('a');
    expect(a()).toBe(false);
    expect(b()).toBe(true);

    service.end('b');
    expect(a()).toBe(false);
    expect(b()).toBe(false);
  });

  it('is safe to end an id that was never started', () => {
    expect(() => service.end('never-started')).not.toThrow();
    expect(service.isPending('never-started')()).toBe(false);
  });

  it('returns a live signal that reflects future state changes', () => {
    const pending = service.isPending('live');
    expect(pending()).toBe(false);

    service.start('live');
    expect(pending()).toBe(true);

    service.end('live');
    expect(pending()).toBe(false);
  });
});
