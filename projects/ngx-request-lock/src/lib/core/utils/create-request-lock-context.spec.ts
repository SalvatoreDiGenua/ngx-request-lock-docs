import { createRequestLockContext } from './create-request-lock-context';
import { REQUEST_LOCK_ID } from '../tokens/request-lock-token';

describe('createRequestLockContext', () => {
  it('returns an HttpContext with the id set under REQUEST_LOCK_ID', () => {
    const context = createRequestLockContext('abc-123');
    expect(context.get(REQUEST_LOCK_ID)).toBe('abc-123');
  });

  it('returns an empty context when id is an empty string', () => {
    const context = createRequestLockContext('');
    expect(context.get(REQUEST_LOCK_ID)).toBeNull();
  });

  it('returns a fresh HttpContext instance on each call', () => {
    const a = createRequestLockContext('id-1');
    const b = createRequestLockContext('id-2');
    expect(a).not.toBe(b);
    expect(a.get(REQUEST_LOCK_ID)).toBe('id-1');
    expect(b.get(REQUEST_LOCK_ID)).toBe('id-2');
  });
});
