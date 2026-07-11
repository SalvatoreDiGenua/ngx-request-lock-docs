import { Component, input } from '@angular/core';
import { CodeBlockComponent } from '../code-block/code-block';

@Component({
  selector: 'ngx-code-example',
  imports: [CodeBlockComponent],
  template: `
    <section class="my-6">
      @if (title(); as t) {
        <h4
          class="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100"
        >
          {{ t }}
        </h4>
      }
      @if (caption(); as c) {
        <p class="mb-2 text-sm text-slate-700 dark:text-slate-300">{{ c }}</p>
      }
      <ngx-code-block [code]="code()" [language]="language()" />
    </section>
  `,
})
export class CodeExampleComponent {
  public readonly code = input.required<string>();
  public readonly language = input<string | null>('typescript');
  public readonly title = input<string | null>(null);
  public readonly caption = input<string | null>(null);
}
