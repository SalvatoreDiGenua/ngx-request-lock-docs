import { Injectable, Signal, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestLockService {
  private readonly _pendingRequests = signal<Record<string, number>>({});

  public isPending(id: string): Signal<boolean> {
    return computed(() => (this._pendingRequests()[id] ?? 0) > 0);
  }

  public start(id: string): void {
    this._pendingRequests.update((map) => ({
      ...map,
      [id]: (map[id] ?? 0) + 1,
    }));
  }

  public end(id: string): void {
    this._pendingRequests.update((map) => {
      const current = map[id] ?? 0;
      if (current <= 1) {
        const next = { ...map };
        delete next[id];
        return next;
      }
      return { ...map, [id]: current - 1 };
    });
  }
}
