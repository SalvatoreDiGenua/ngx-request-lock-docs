import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';
import { HttpContext } from '@angular/common/http';
import { RequestLockService } from '../core/services/request-lock-service';
import { createRequestLockContext } from '../core/utils/create-request-lock-context';

const MIN_TIMEOUT_MS = 500;
const MAX_TIMEOUT_MS = 10_000;

/**
 * The `$event` of a `(click)` bound on the element that carries `ngxRequestLock`.
 *
 * ```html
 * <button ngxRequestLock (click)="save($event)">Save</button>
 * ```
 * ```ts
 * save(event: RequestLockMouseEvent) {
 *   this.http.post('/api/items', body, { context: event.context }).subscribe();
 * }
 * ```
 *
 * The properties are optional only because Angular types `$event` as
 * `PointerEvent`; the directive always sets them.
 */
export interface RequestLockMouseEvent extends MouseEvent {
  readonly requestId?: string;
  readonly context?: HttpContext;
}

@Directive({
  selector: '[ngxRequestLock]',
  exportAs: 'requestLock',
  host: {
    '(click)': 'onClick($event)',
  },
})
export class RequestLockDirective implements AfterViewInit {
  public readonly requestId = input<string, string | null>(
    crypto.randomUUID(),
    {
      transform: (value: string | null) => value || crypto.randomUUID(),
    },
  );

  private readonly elementRef: ElementRef<HTMLElement> = inject(
    ElementRef<HTMLElement>,
  );
  private readonly renderer = inject(Renderer2);
  private readonly trackingService = inject(RequestLockService);

  protected isBlocked = false;
  protected button: HTMLButtonElement | null = null;

  private timeouts: ReturnType<typeof setTimeout>[] = [];

  private hasSeenPending = false;
  protected isClicked = false;

  constructor() {
    effect(() => {
      const pending = this.trackingService.isPending(this.requestId())();

      this.hasSeenPending ||= pending;

      if (pending) {
        this.lock();
      } else {
        this.unlock();
      }
    });
  }

  public ngAfterViewInit(): void {
    this.button =
      (this.elementRef.nativeElement.closest(
        'button',
      ) as HTMLButtonElement | null) ??
      this.elementRef.nativeElement.querySelector('button');
  }

  public onClick(event?: MouseEvent): void {
    this.isClicked = true;
    this.lock();

    this.cleanupTimeouts();
    this.timeouts.push(
      setTimeout(() => !this.hasSeenPending && this.unlock(), MIN_TIMEOUT_MS),
      setTimeout(() => this.unlock(), MAX_TIMEOUT_MS),
    );

    // Host listeners run before the element's own (click) bindings.
    if (event) {
      const id = this.requestId();
      Object.assign(event, {
        requestId: id,
        context: createRequestLockContext(id),
      });
    }
  }

  protected setBlockStatus(): void {
    if (!this.button) {
      return;
    }

    if (this.isBlocked) {
      this.renderer.setAttribute(this.button, 'disabled', 'true');
    } else {
      this.renderer.removeAttribute(this.button, 'disabled');
    }
  }

  private lock(): void {
    this.isBlocked = true;
    this.setBlockStatus();
  }

  private unlock(): void {
    this.isBlocked = false;
    this.isClicked = false;
    this.setBlockStatus();
    this.cleanupTimeouts();
  }

  private cleanupTimeouts(): void {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }
}
