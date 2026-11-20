import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'ngx-not-found-page',
  imports: [RouterLink, TranslocoPipe],
  template: `
    <h1 class="mb-4 text-3xl font-bold">{{ 'notFound.title' | transloco }}</h1>
    <p class="mb-4">{{ 'notFound.description' | transloco }}</p>
    <a
      routerLink="/"
      class="rounded underline focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      {{ 'notFound.home' | transloco }}
    </a>
  `,
})
export default class NotFoundPage {}
