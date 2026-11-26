import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'ngx-not-found-page',
  imports: [RouterLink, TranslocoPipe],
  template: `
    <h1 class="mb-4 text-3xl font-semibold">
      {{ 'notFound.title' | transloco }}
    </h1>
    <p class="mb-4">{{ 'notFound.description' | transloco }}</p>
    <a
      [routerLink]="language.path('/')"
      class="rounded underline focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      {{ 'notFound.home' | transloco }}
    </a>
  `,
})
export default class NotFoundPage {
  protected readonly language = inject(LanguageService);
}
