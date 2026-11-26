import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export interface DiagramStage {
  readonly id: string;
  readonly titleKey: string;
  readonly code: string;
  readonly descriptionKey: string;
}

/** A semantic, responsive sequence for a technical request flow. */
@Component({
  selector: 'ngx-diagram-block',
  imports: [TranslocoPipe],
  template: `
    <figure
      class="request-flow my-8 rounded-xl p-6 sm:p-8"
      [attr.aria-label]="ariaLabel()"
    >
      <ol class="request-flow-stages">
        @for (stage of stages(); track stage.id; let index = $index) {
          <li class="request-flow-stage">
            <span class="request-flow-number" aria-hidden="true">{{
              index + 1
            }}</span>
            <h3 class="mb-3 text-lg font-semibold leading-snug">
              {{ stage.titleKey | transloco }}
            </h3>
            <code
              class="request-flow-code block font-mono font-medium"
              [textContent]="stage.code"
            ></code>
            <p class="request-flow-description mt-4 text-base leading-relaxed">
              {{ stage.descriptionKey | transloco }}
            </p>
            @if (!$last) {
              <svg
                aria-hidden="true"
                class="request-flow-connector"
                viewBox="0 0 40 20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M1 10h36m-6-6 6 6-6 6"
                />
              </svg>
            }
          </li>
        }
      </ol>

      @if (caption(); as text) {
        <figcaption class="request-flow-caption mt-8 text-base leading-relaxed">
          {{ text }}
        </figcaption>
      }
    </figure>
  `,
})
export class DiagramBlockComponent {
  public readonly stages = input.required<readonly DiagramStage[]>();
  public readonly caption = input<string | null>(null);
  public readonly ariaLabel = input<string | null>(null);
}
