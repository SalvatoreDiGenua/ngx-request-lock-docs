import { Component } from '@angular/core';
import { translateSignal } from '@jsverse/transloco';
import { PagePlaceholderComponent } from '../_shared/page-placeholder';

@Component({
  selector: 'ngx-limitations-page',
  imports: [PagePlaceholderComponent],
  template: `<ngx-page-placeholder [title]="title()" />`,
})
export default class LimitationsPage {
  protected readonly title = translateSignal('nav.limitations');
}
