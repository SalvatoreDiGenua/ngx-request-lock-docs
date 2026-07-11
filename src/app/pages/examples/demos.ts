/**
 * Interactive demos for the Examples page.
 *
 * Every demo below wires the real `ngxRequestLock` directive to a real HTTP
 * call against https://jsonplaceholder.typicode.com (a public fake REST API
 * used for docs and testing). Each demo follows the same three-piece pattern:
 *
 *   1. `ngxRequestLock #lock="requestLock"` on the button.
 *   2. `lock.requestId` passed to `createRequestLockContext(id)` on click.
 *   3. `HttpClient` with `{ context }` on a real endpoint.
 *
 * The library takes care of disabling the button while the interceptor sees
 * the request pending. When the request settles - success, error, or a
 * safety timeout - the button re-enables automatically.
 */

import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  RequestLockDirective,
  RequestLockService,
  createRequestLockContext,
} from 'ngx-request-lock';
import { DemoStatusPillComponent } from './demo-status-pill';
import { DemoStatus } from './demos-types';

const API = 'https://jsonplaceholder.typicode.com';

const IDLE: DemoStatus = { kind: 'idle', text: '' };

/* --------------------------------------------------------------------------
 * Shared button classes (Tailwind, matches the docs palette)
 * ------------------------------------------------------------------------ */

const BTN =
  'inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm ' +
  'hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

const BTN_DANGER =
  'inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm ' +
  'hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

/* --------------------------------------------------------------------------
 * 1. Basic (GET)
 * ------------------------------------------------------------------------ */

@Component({
  selector: 'ngx-basic-demo',
  imports: [RequestLockDirective, DemoStatusPillComponent],
  template: `
    <div class="flex flex-wrap items-center">
      <button
        ngxRequestLock
        #lock="requestLock"
        type="button"
        [class]="btn"
        (click)="ping(lock.requestId)"
      >
        Ping
      </button>
      <ngx-demo-status-pill [status]="status()" />
    </div>
  `,
})
export class BasicDemo {
  protected readonly btn = BTN;
  protected readonly status = signal<DemoStatus>(IDLE);
  private readonly http = inject(HttpClient);

  protected ping(id: string): void {
    this.status.set(IDLE);
    this.http
      .get<{ id: number }>(`${API}/posts/1`, {
        context: createRequestLockContext(id),
      })
      .subscribe({
        next: (post) =>
          this.status.set({ kind: 'ok', text: `Loaded post #${post.id}` }),
        error: () =>
          this.status.set({ kind: 'error', text: 'Request failed' }),
      });
  }
}

/* --------------------------------------------------------------------------
 * 2. Save (POST)
 * ------------------------------------------------------------------------ */

@Component({
  selector: 'ngx-save-demo',
  imports: [RequestLockDirective, DemoStatusPillComponent],
  template: `
    <div class="flex flex-wrap items-center">
      <button
        ngxRequestLock
        #lock="requestLock"
        type="button"
        [class]="btn"
        (click)="save(lock.requestId)"
      >
        Save
      </button>
      <ngx-demo-status-pill [status]="status()" />
    </div>
  `,
})
export class SaveDemo {
  protected readonly btn = BTN;
  protected readonly status = signal<DemoStatus>(IDLE);
  private readonly http = inject(HttpClient);

  protected save(id: string): void {
    this.status.set(IDLE);
    this.http
      .post<{ id: number }>(
        `${API}/posts`,
        { title: 'ngx-request-lock', body: 'demo', userId: 1 },
        { context: createRequestLockContext(id) },
      )
      .subscribe({
        next: (created) =>
          this.status.set({ kind: 'ok', text: `Saved (id ${created.id})` }),
        error: () => this.status.set({ kind: 'error', text: 'Save failed' }),
      });
  }
}

/* --------------------------------------------------------------------------
 * 3. Delete (DELETE)
 * ------------------------------------------------------------------------ */

@Component({
  selector: 'ngx-delete-demo',
  imports: [RequestLockDirective, DemoStatusPillComponent],
  template: `
    <div class="flex flex-wrap items-center">
      <button
        ngxRequestLock
        #lock="requestLock"
        type="button"
        [class]="btn"
        (click)="remove(lock.requestId)"
      >
        Delete
      </button>
      <ngx-demo-status-pill [status]="status()" />
    </div>
  `,
})
export class DeleteDemo {
  protected readonly btn = BTN_DANGER;
  protected readonly status = signal<DemoStatus>(IDLE);
  private readonly http = inject(HttpClient);

  protected remove(id: string): void {
    this.status.set(IDLE);
    this.http
      .delete(`${API}/posts/1`, { context: createRequestLockContext(id) })
      .subscribe({
        next: () => this.status.set({ kind: 'ok', text: 'Deleted' }),
        error: () =>
          this.status.set({ kind: 'error', text: 'Delete failed' }),
      });
  }
}

/* --------------------------------------------------------------------------
 * 4. Reactive form (POST)
 * ------------------------------------------------------------------------ */

@Component({
  selector: 'ngx-form-demo',
  imports: [RequestLockDirective, ReactiveFormsModule, DemoStatusPillComponent],
  template: `
    <form
      class="space-y-3"
      [formGroup]="form"
      (ngSubmit)="submit(lock.requestId)"
    >
      <div class="flex flex-col gap-1">
        <label
          for="signup-email"
          class="text-xs font-medium uppercase tracking-wide text-slate-700 dark:text-slate-300"
        >
          Email
        </label>
        <input
          id="signup-email"
          type="email"
          formControlName="email"
          autocomplete="email"
          class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label
          for="signup-password"
          class="text-xs font-medium uppercase tracking-wide text-slate-700 dark:text-slate-300"
        >
          Password
        </label>
        <input
          id="signup-password"
          type="password"
          formControlName="password"
          autocomplete="new-password"
          class="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
        />
      </div>

      <div class="flex flex-wrap items-center pt-1">
        <button
          ngxRequestLock
          #lock="requestLock"
          type="submit"
          [class]="btn"
          [disabled]="form.invalid"
        >
          Sign up
        </button>
        <ngx-demo-status-pill [status]="status()" />
      </div>
    </form>
  `,
})
export class FormDemo {
  protected readonly btn = BTN;
  protected readonly status = signal<DemoStatus>(IDLE);
  private readonly http = inject(HttpClient);
  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['demo@example.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(8)]],
  });

  protected submit(id: string): void {
    if (this.form.invalid) {
      return;
    }
    this.status.set(IDLE);
    this.http
      .post<{ id: number }>(`${API}/users`, this.form.getRawValue(), {
        context: createRequestLockContext(id),
      })
      .subscribe({
        next: (user) =>
          this.status.set({
            kind: 'ok',
            text: `Signed up (id ${user.id})`,
          }),
        error: () =>
          this.status.set({ kind: 'error', text: 'Sign up failed' }),
      });
  }
}

/* --------------------------------------------------------------------------
 * 5. Pending-state variant ("Saving..." + spinner)
 * ------------------------------------------------------------------------
 * Angular-native: reads `RequestLockService.isPending(lock.requestId)` as a
 * signal via `viewChild(RequestLockDirective)`, then flips the label and
 * shows an inline SVG spinner. No directive extension needed; no
 * @HostBinding / @HostListener; no per-component `loading` boolean.
 */

@Component({
  selector: 'ngx-pending-state-demo',
  imports: [RequestLockDirective, DemoStatusPillComponent],
  template: `
    <div class="flex flex-wrap items-center">
      <button
        ngxRequestLock
        #lock="requestLock"
        type="button"
        [class]="btn"
        [attr.aria-busy]="isPending() ? 'true' : null"
        (click)="save(lock.requestId)"
      >
        @if (isPending()) {
          <svg
            class="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Saving&hellip;</span>
        } @else {
          <span>Save</span>
        }
      </button>
      <ngx-demo-status-pill [status]="status()" />
    </div>
  `,
})
export class PendingStateDemo {
  protected readonly btn = BTN;
  protected readonly status = signal<DemoStatus>(IDLE);

  private readonly http = inject(HttpClient);
  private readonly lockService = inject(RequestLockService);
  private readonly lock = viewChild.required(RequestLockDirective);

  /**
   * Reactive pending flag derived from the shared service.
   * `isPending(id)` returns a `Signal<boolean>` per id; wrapping it in a
   * `computed` keeps the id lookup reactive if the directive re-mounts.
   */
  protected readonly isPending = computed(() =>
    this.lockService.isPending(this.lock().requestId)(),
  );

  protected save(id: string): void {
    this.status.set(IDLE);
    this.http
      .post<{ id: number }>(
        `${API}/posts`,
        { title: 'ngx-request-lock', body: 'pending-state demo', userId: 1 },
        { context: createRequestLockContext(id) },
      )
      .subscribe({
        next: (created) =>
          this.status.set({ kind: 'ok', text: `Saved (id ${created.id})` }),
        error: () => this.status.set({ kind: 'error', text: 'Save failed' }),
      });
  }
}
