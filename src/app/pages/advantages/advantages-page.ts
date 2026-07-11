import { Component } from '@angular/core';
import { translateSignal } from '@jsverse/transloco';
import { PagePlaceholderComponent } from '../_shared/page-placeholder';

@Component({
  selector: 'ngx-advantages-page',
  imports: [PagePlaceholderComponent],
  template: `<ngx-page-placeholder [title]="title()" />`,
})
export default class AdvantagesPage {
  protected readonly title = translateSignal('nav.advantages');
}
