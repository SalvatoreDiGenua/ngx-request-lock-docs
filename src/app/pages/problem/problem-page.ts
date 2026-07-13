import { Component } from '@angular/core';
import { TranslocoDirective, translateSignal } from '@jsverse/transloco';
import { CodeExampleComponent } from '../../shared/ui/code-example/code-example';
import { SectionHeadingComponent } from '../../shared/ui/section-heading/section-heading';

const NAIVE_CODE = `@Component({
  selector: 'ngx-save-user',
  template: \`
    <button (click)="save()" [disabled]="loading">Save</button>
  \`,
})
export class SaveUser {
  private readonly http = inject(HttpClient);
  protected loading = false;

  protected save(): void {
    this.loading = true;
    this.http.post('/api/users', this.form.value).subscribe({
      next: () => (this.loading = false),
      error: () => (this.loading = false),
    });
  }
}`;

const LIBRARY_CODE = `@Component({
  selector: 'ngx-save-user',
  imports: [RequestLockDirective],
  template: \`
    <button ngxRequestLock #lock="requestLock" (click)="save(lock.requestId())">
      Save
    </button>
  \`,
})
export class SaveUser {
  private readonly http = inject(HttpClient);

  protected save(id: string): void {
    this.http
      .post('/api/users', this.form.value, {
        context: createRequestLockContext(id),
      })
      .subscribe();
  }
}`;

@Component({
  selector: 'ngx-problem-page',
  imports: [TranslocoDirective, CodeExampleComponent, SectionHeadingComponent],
  template: `
    <article *transloco="let t" class="max-w-none">
      <h1 class="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {{ title() }}
      </h1>

      <p class="text-base text-slate-700 dark:text-slate-300">
        {{ t('problem.intro') }}
      </p>

      <ngx-section-heading anchor="symptoms">
        {{ t('problem.symptoms.title') }}
      </ngx-section-heading>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('problem.symptoms.list')"
      ></ul>

      <ngx-section-heading anchor="naive">
        {{ t('problem.naive.title') }}
      </ngx-section-heading>

      <p class="text-slate-700 dark:text-slate-300">
        {{ t('problem.naive.text') }}
      </p>

      <ngx-code-example [code]="naiveCode" language="typescript" />

      <ngx-section-heading anchor="with-library">
        {{ t('problem.withLibrary.title') }}
      </ngx-section-heading>

      <p
        class="text-slate-700 dark:text-slate-300"
        [innerHTML]="t('problem.withLibrary.text')"
      ></p>

      <ngx-code-example [code]="libraryCode" language="typescript" />

      <ngx-section-heading anchor="scope">
        {{ t('problem.scope.title') }}
      </ngx-section-heading>

      <ul
        class="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300"
        [innerHTML]="t('problem.scope.list')"
      ></ul>
    </article>
  `,
})
export default class ProblemPage {
  protected readonly title = translateSignal('nav.problem');
  protected readonly naiveCode = NAIVE_CODE;
  protected readonly libraryCode = LIBRARY_CODE;
}
