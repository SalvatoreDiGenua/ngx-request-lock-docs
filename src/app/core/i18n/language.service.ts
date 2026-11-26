import { Service, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Router } from '@angular/router';
import { localizedPath } from './locale-routes';

export type Language = 'it' | 'en';

const AVAILABLE: readonly Language[] = ['en', 'it'];

/**
 * Thin signal-based facade over {@link TranslocoService}.
 *
 * Transloco already handles storage (via `@jsverse/transloco-persist-lang`) and
 * translation loading. This service exposes the active language as a signal
 * and maps the language switch to the corresponding indexable URL.
 */
@Service()
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly router = inject(Router);

  private readonly _language = signal<Language>(
    this.normalize(this.transloco.getActiveLang()),
  );

  public readonly language = this._language.asReadonly();

  constructor() {
    this.transloco.langChanges$.subscribe((lang) => {
      this._language.set(this.normalize(lang));
    });
  }

  public set(next: Language): void {
    const path =
      this.router.url.split(/[?#]/, 1)[0].replace(/^\/it(?=\/|$)/, '') || '/';
    void this.router.navigateByUrl(localizedPath(path, next));
  }

  public toggle(): void {
    this.set(this._language() === 'en' ? 'it' : 'en');
  }

  public path(route: string): string {
    return localizedPath(route, this._language());
  }

  private normalize(lang: string): Language {
    return AVAILABLE.includes(lang as Language) ? (lang as Language) : 'en';
  }
}
