import { Component } from '@angular/core';
import { DocsShellComponent } from './core/layout/docs-shell/docs-shell';

@Component({
  selector: 'ngx-root',
  imports: [DocsShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
