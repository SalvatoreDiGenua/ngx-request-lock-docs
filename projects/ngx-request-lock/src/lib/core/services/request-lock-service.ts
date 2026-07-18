import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestLockService {
  private readonly _pendingRequests = signal<Map<string, number>>(new Map());

  public isPending(id: string): Signal<boolean> {
    return computed(() => (this._pendingRequests().get(id) ?? 0) > 0);
  }

  public start(id: string): void {
    this._pendingRequests.update((map) => {
      const next = new Map(map);
      next.set(id, (next.get(id) ?? 0) + 1);
      return next;
    });
  }

  public end(id: string): void {
    this._pendingRequests.update((map) => {
      const current = map.get(id) ?? 0;
      const next = new Map(map);
      if (current <= 1) {
        next.delete(id);
      } else {
        next.set(id, current - 1);
      }
      return next;
    });
  }
}
