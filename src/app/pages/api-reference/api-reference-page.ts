import { Component } from '@angular/core';
import { translateSignal } from '@jsverse/transloco';
import { PagePlaceholderComponent } from '../_shared/page-placeholder';

@Component({
  selector: 'ngx-api-reference-page',
  imports: [PagePlaceholderComponent],
  template: `<ngx-page-placeholder [title]="title()" />`,
})
export default class ApiReferencePage {
  protected readonly title = translateSignal('nav.api');
}
