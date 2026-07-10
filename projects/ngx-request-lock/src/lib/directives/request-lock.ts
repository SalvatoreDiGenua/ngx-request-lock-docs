import {
  AfterViewInit,
  Directive,
  EffectRef,
  ElementRef,
  HostListener,
  Injector,
  Renderer2,
  effect,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { RequestLockService } from '../core/services/request-lock-service';

const MIN_TIMEOUT_MS = 500;
const MAX_TIMEOUT_MS = 10_000;

@Directive({
  selector: '[ngxRequestLock]',
  exportAs: 'requestLock',
})
export class RequestLockDirective implements AfterViewInit {
  public readonly requestId = crypto.randomUUID();

  private readonly elementRef: ElementRef<HTMLElement> = inject(
    ElementRef<HTMLElement>,
  );
  private readonly renderer = inject(Renderer2);
  private readonly injector = inject(Injector);
  private readonly trackingService = inject(RequestLockService);

  protected isBlocked = false;
  protected button: HTMLButtonElement | null = null;

  private activeEffect: EffectRef | null = null;
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  public ngAfterViewInit(): void {
    this.button =
      (this.elementRef.nativeElement.closest(
        'button',
      ) as HTMLButtonElement | null) ??
      this.elementRef.nativeElement.querySelector('button');
  }

  @HostListener('click', [])
  public onClick(): void {
    this.cleanup();
    this.isBlocked = true;
    this.setBlockStatus();

    let hasSeenPending = false;

    this.timeouts.push(
      setTimeout(() => !hasSeenPending && this.unblock(), MIN_TIMEOUT_MS),
      setTimeout(() => this.unblock(), MAX_TIMEOUT_MS),
    );

    this.activeEffect = runInInjectionContext(this.injector, () =>
      effect(() => {
        const pending = this.trackingService.isPending(this.requestId)();
        hasSeenPending ||= pending;

        if (!pending && hasSeenPending) {
          this.unblock();
        }
      }),
    );
  }

  protected setBlockStatus(): void {
    if (!this.button) {
      return;
    }

    this.renderer.removeAttribute(this.button, 'disabled');

    if (this.isBlocked) {
      this.renderer.setAttribute(this.button, 'disabled', 'true');
    }
  }

  private unblock(): void {
    this.isBlocked = false;
    this.setBlockStatus();
    this.cleanup();
  }

  private cleanup(): void {
    this.activeEffect?.destroy();
    this.activeEffect = null;
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }
}
