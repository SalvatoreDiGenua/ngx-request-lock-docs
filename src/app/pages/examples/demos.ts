/**
 * Interactive demos for the Examples page.
 *
 * Every demo below wires the real `ngxRequestLock` directive to a real HTTP
 * call against https://jsonplaceholder.typicode.com (a public fake REST API
 * used for docs and testing). Each demo follows the same three-piece pattern:
 *
 *   1. `ngxRequestLock #lock="requestLock"` on the button.
 *   2. `lock.requestId()` passed to `createRequestLockContext(id)` on click.
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
        (click)="ping(lock.requestId())"
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
        error: () => this.status.set({ kind: 'error', text: 'Request failed' }),
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
        (click)="save(lock.requestId())"
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
        (click)="remove(lock.requestId())"
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
        error: () => this.status.set({ kind: 'error', text: 'Delete failed' }),
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
    <form class="space-y-3" [formGroup]="form">
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
          [class]="btn"
          [disabled]="form.invalid"
          (click)="submit(lock.requestId())"
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
    console.log('submit', id);

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
        error: () => this.status.set({ kind: 'error', text: 'Sign up failed' }),
      });
  }
}

/* --------------------------------------------------------------------------
 * 5. Pending-state variant ("Saving..." + spinner)
 * ------------------------------------------------------------------------
 * Angular-native: reads `RequestLockService.isPending(lock.requestId())` as a
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
        (click)="save(lock.requestId())"
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
          <span>Saving...</span>
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
    this.lockService.isPending(this.lock().requestId())(),
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

/* --------------------------------------------------------------------------
 * 6. Flow lock: one shared requestId coordinates a whole flow
 * ------------------------------------------------------------------------
 * A single `requestId()` (owned by the component) is bound to every element
 * that participates in the same user flow: the primary action (POST), a
 * related action (Reset), and even the automatic follow-up refresh (GET).
 * All requests tagged with that id share one reference-counted lock, so the
 * entire panel stays disabled until the mutation *and* the refresh settle.
 */

@Component({
  selector: 'ngx-flow-lock-demo',
  imports: [RequestLockDirective, DemoStatusPillComponent],
  template: `
    <div class="space-y-3">
      <div class="flex flex-wrap items-center gap-2">
        <!--
          Two buttons, one shared requestId. Both directives observe the
          same pending signal, so clicking either one - or the automatic
          GET refresh that follows - keeps both locked until the flow
          settles.
        -->
        <button
          ngxRequestLock
          [requestId]="flowId()"
          type="button"
          [class]="btn"
          (click)="save()"
        >
          Save
        </button>

        <button
          ngxRequestLock
          [requestId]="flowId()"
          type="button"
          [class]="btnSecondary"
          (click)="reset()"
        >
          Reset
        </button>

        <ngx-demo-status-pill [status]="status()" />
      </div>

      <p class="text-xs text-slate-600 dark:text-slate-400">
        Last loaded title:
        <code class="font-mono">{{ lastTitle() || '-' }}</code>
      </p>
    </div>
  `,
})
export class FlowLockDemo {
  protected readonly btn = BTN;
  protected readonly btnSecondary =
    'inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm ' +
    'hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-white dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 ' +
    'dark:focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60';

  protected readonly status = signal<DemoStatus>(IDLE);
  protected readonly lastTitle = signal<string>('');

  // One id owns the whole flow: the mutation, the refresh, and the reset.
  protected readonly flowId = signal(crypto.randomUUID());

  private readonly http = inject(HttpClient);

  protected save(): void {
    const id = this.flowId();
    this.status.set(IDLE);

    this.http
      .post<{ id: number }>(
        `${API}/posts`,
        { title: 'ngx-request-lock', body: 'flow-lock demo', userId: 1 },
        { context: createRequestLockContext(id) },
      )
      .subscribe({
        next: (created) => {
          this.status.set({ kind: 'ok', text: `Saved (id ${created.id})` });
          // Automatic follow-up refresh: same id, so the lock does not
          // release until the GET also settles.
          this.refresh(id);
        },
        error: () => this.status.set({ kind: 'error', text: 'Save failed' }),
      });
  }

  protected reset(): void {
    this.lastTitle.set('');
    this.status.set(IDLE);
    // A different HTTP call under the same id: still part of the flow,
    // still shares the same lock.
    this.refresh(this.flowId());
  }

  private refresh(id: string): void {
    this.http
      .get<{ title: string }>(`${API}/posts/1`, {
        context: createRequestLockContext(id),
      })
      .subscribe({
        next: (post) => this.lastTitle.set(post.title),
        error: () => this.status.set({ kind: 'error', text: 'Refresh failed' }),
      });
  }
}

/* --------------------------------------------------------------------------
 * 7. Visual in-flight variant (panel-level)
 * ------------------------------------------------------------------------
 * The shared `requestId` is not just useful for locking buttons: any part of
 * the UI can react to `RequestLockService.isPending(id)` and render its own
 * in-flight state. Here the whole panel dims, sets `aria-busy`, and shows an
 * overlay while any request tagged with the flow id is pending.
 */

@Component({
  selector: 'ngx-in-flight-variant-demo',
  imports: [RequestLockDirective, DemoStatusPillComponent],
  template: `
    <div
      class="relative rounded-md border border-slate-200 p-4 transition-opacity dark:border-slate-700"
      [class.opacity-60]="isPending()"
      [class.pointer-events-none]="isPending()"
      [attr.aria-busy]="isPending() ? 'true' : null"
    >
      <div class="flex flex-wrap items-center gap-2">
        <button
          ngxRequestLock
          [requestId]="flowId()"
          type="button"
          [class]="btn"
          (click)="load()"
        >
          Load post
        </button>

        <button
          ngxRequestLock
          [requestId]="flowId()"
          type="button"
          [class]="btnDanger"
          (click)="destroy()"
        >
          Delete
        </button>

        <ngx-demo-status-pill [status]="status()" />
      </div>

      <p class="mt-3 text-xs text-slate-600 dark:text-slate-400">
        Last loaded post id:
        <code class="font-mono">{{ postId() ?? '-' }}</code>
      </p>

      @if (isPending()) {
        <div
          class="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-white/60 backdrop-blur-[1px] dark:bg-slate-900/50"
          aria-hidden="true"
        >
          <svg
            class="h-6 w-6 animate-spin text-sky-600 dark:text-sky-400"
            viewBox="0 0 24 24"
            fill="none"
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
        </div>
      }
    </div>
  `,
})
export class InFlightVariantDemo {
  protected readonly btn = BTN;
  protected readonly btnDanger = BTN_DANGER;

  protected readonly status = signal<DemoStatus>(IDLE);
  protected readonly postId = signal<number | null>(null);
  protected readonly flowId = signal(crypto.randomUUID());

  private readonly http = inject(HttpClient);
  private readonly lockService = inject(RequestLockService);

  // Panel-level in-flight signal: any request tagged with `flowId` counts.
  protected readonly isPending = computed(() =>
    this.lockService.isPending(this.flowId())(),
  );

  protected load(): void {
    const id = this.flowId();
    this.status.set(IDLE);
    this.http
      .get<{ id: number }>(`${API}/posts/2`, {
        context: createRequestLockContext(id),
      })
      .subscribe({
        next: (post) => {
          this.postId.set(post.id);
          this.status.set({ kind: 'ok', text: `Loaded #${post.id}` });
        },
        error: () => this.status.set({ kind: 'error', text: 'Load failed' }),
      });
  }

  protected destroy(): void {
    const id = this.flowId();
    this.status.set(IDLE);
    this.http
      .delete(`${API}/posts/2`, { context: createRequestLockContext(id) })
      .subscribe({
        next: () => {
          this.postId.set(null);
          this.status.set({ kind: 'ok', text: 'Deleted' });
        },
        error: () => this.status.set({ kind: 'error', text: 'Delete failed' }),
      });
  }
}
