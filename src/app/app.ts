import { Component } from '@angular/core';
import { DocsShellComponent } from './core/layout/docs-shell/docs-shell';

@Component({
  selector: 'ngx-root',
  imports: [DocsShellComponent],
  template: `<ngx-docs-shell />`,
})
export class App {}
