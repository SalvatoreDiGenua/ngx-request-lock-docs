import { Component, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

export interface ApiRow {
  readonly name: string;
  readonly kind: string;
  readonly signature: string;
  readonly description: string;
}

@Component({
  selector: 'ngx-api-table',
  imports: [TranslocoPipe],
  template: `
    <div
      class="my-6 overflow-x-auto rounded-lg border border-slate-300 shadow-sm dark:border-slate-700"
    >
      <table class="w-full border-collapse text-left text-sm">
        <caption class="sr-only">
          {{
            caption()
          }}
        </caption>
        <thead
          class="bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
        >
          <tr class="border-b border-slate-300 dark:border-slate-700">
            <th scope="col" class="px-4 py-2.5 font-semibold">
              {{ 'api.name' | transloco }}
            </th>
            <th scope="col" class="px-4 py-2.5 font-semibold">
              {{ 'api.kind' | transloco }}
            </th>
            <th scope="col" class="px-4 py-2.5 font-semibold">
              {{ 'api.signature' | transloco }}
            </th>
            <th scope="col" class="px-4 py-2.5 font-semibold">
              {{ 'api.description' | transloco }}
            </th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-slate-300 bg-white dark:divide-slate-700 dark:bg-slate-950"
        >
          @for (row of rows(); track row.name) {
            <tr class="align-top">
              <td
                class="px-4 py-3 font-mono text-xs font-semibold text-slate-900 dark:text-slate-50"
              >
                {{ row.name }}
              </td>
              <td class="px-4 py-3 text-xs text-slate-700 dark:text-slate-300">
                {{ row.kind }}
              </td>
              <td
                class="px-4 py-3 font-mono text-xs text-slate-800 dark:text-slate-200"
              >
                {{ row.signature }}
              </td>
              <td class="px-4 py-3 text-sm text-slate-800 dark:text-slate-200">
                {{ row.description }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ApiTableComponent {
  public readonly rows = input.required<readonly ApiRow[]>();
  public readonly caption = input<string>('');
}
