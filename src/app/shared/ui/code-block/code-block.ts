import { Component, input, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ngx-code-block',
  imports: [TranslocoPipe],
  template: `
    <figure
      class="relative my-4 overflow-hidden rounded-lg border border-slate-300 bg-slate-950 text-slate-100 shadow-sm dark:border-slate-700"
    >
      @if (language(); as lang) {
        <figcaption
          class="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2 text-xs font-mono uppercase tracking-wide text-slate-200"
        >
          <span>{{ lang }}</span>
          <button
            type="button"
            class="rounded px-2 py-1 text-xs font-sans font-medium text-slate-100 hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            [attr.aria-label]="'common.copyAriaLabel' | transloco"
            (click)="copy()"
          >
            {{
              copied()
                ? ('common.copied' | transloco)
                : ('common.copy' | transloco)
            }}
          </button>
        </figcaption>
      }
      <pre
        class="overflow-x-auto px-4 py-4 text-sm leading-relaxed"
      ><code>{{ code() }}</code></pre>
    </figure>
  `,
})
export class CodeBlockComponent {
  public readonly code = input.required<string>();
  public readonly language = input<string | null>(null);

  protected readonly copied = signal(false);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  protected async copy(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      // clipboard unavailable, silently ignore
    }
  }
}
