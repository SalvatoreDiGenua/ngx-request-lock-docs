import { Directive, Renderer2, inject } from '@angular/core';
import { RequestLockDirective } from 'ngx-request-lock';

/**
 * Docs-app-only example.
 *
 * Extends the library's `RequestLockDirective` and overrides `setBlockStatus`
 * to render a custom loading animation instead of the default `[disabled]`
 * attribute swap.
 *
 * While a request tagged with the directive's `requestId` is pending, the host
 * button:
 *   - stays interactive-blocked via `aria-disabled="true"` and `aria-busy="true"`;
 *   - gets a `ngx-lock-loading` class that consumers can style (e.g. a spinner);
 *   - shows a spinner glyph injected as a child element.
 *
 * This directive lives in the docs app, not in the library, to demonstrate the
 * extension point without adding UI opinions to `ngx-request-lock` itself.
 */
@Directive({
  selector: '[ngxLoadingRequestLock]',
  exportAs: 'loadingRequestLock',
})
export class LoadingRequestLockDirective extends RequestLockDirective {
  private readonly localRenderer = inject(Renderer2);
  private spinner: HTMLElement | null = null;

  protected override setBlockStatus(): void {
    if (!this.button) {
      return;
    }

    if (this.isBlocked) {
      this.localRenderer.setAttribute(this.button, 'aria-disabled', 'true');
      this.localRenderer.setAttribute(this.button, 'aria-busy', 'true');
      this.localRenderer.addClass(this.button, 'ngx-lock-loading');
      this.attachSpinner();
      return;
    }

    this.localRenderer.removeAttribute(this.button, 'aria-disabled');
    this.localRenderer.removeAttribute(this.button, 'aria-busy');
    this.localRenderer.removeClass(this.button, 'ngx-lock-loading');
    this.detachSpinner();
  }

  private attachSpinner(): void {
    if (this.spinner || !this.button) {
      return;
    }

    const el = this.localRenderer.createElement('span') as HTMLElement;
    this.localRenderer.addClass(el, 'ngx-lock-spinner');
    this.localRenderer.setAttribute(el, 'aria-hidden', 'true');
    this.localRenderer.appendChild(this.button, el);
    this.spinner = el;
  }

  private detachSpinner(): void {
    if (!this.spinner || !this.button) {
      return;
    }
    this.localRenderer.removeChild(this.button, this.spinner);
    this.spinner = null;
  }
}
