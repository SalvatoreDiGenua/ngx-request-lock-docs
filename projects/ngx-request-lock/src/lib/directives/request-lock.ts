import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';
import { RequestLockService } from '../core/services/request-lock-service';

const MIN_TIMEOUT_MS = 500;
const MAX_TIMEOUT_MS = 10_000;

@Directive({
  selector: '[ngxRequestLock]',
  exportAs: 'requestLock',
})
export class RequestLockDirective implements AfterViewInit {
  public readonly requestId = input<string, string>(crypto.randomUUID(), {
    transform: (valueInput: string | null) => valueInput || crypto.randomUUID(),
  });

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
      const pending = this.trackingService.isPending(
        this.requestId() as string,
      )();

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

  @HostListener('click', [])
  public onClick(): void {
    this.isClicked = true;
    this.lock();

    this.cleanupTimeouts();
    this.timeouts.push(
      setTimeout(() => !this.hasSeenPending && this.lock(), MIN_TIMEOUT_MS),
      setTimeout(() => this.unlock(), MAX_TIMEOUT_MS),
    );
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
