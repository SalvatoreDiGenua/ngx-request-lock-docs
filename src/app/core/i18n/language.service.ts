import { Service, inject, signal, effect } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

export type Language = 'it' | 'en';

const AVAILABLE: readonly Language[] = ['en', 'it'];

/**
 * Thin signal-based facade over {@link TranslocoService}.
 *
 * Transloco already handles storage (via `@jsverse/transloco-persist-lang`) and
 * translation loading. This service only exposes the active language as a
 * `Signal` so components can react with `computed`/`effect` without subscribing
 * to `langChanges$` manually.
 */
@Service()
export class LanguageService {
  private readonly transloco = inject(TranslocoService);

  private readonly _language = signal<Language>(
    this.normalize(this.transloco.getActiveLang()),
  );

  public readonly language = this._language.asReadonly();

  constructor() {
    this.transloco.langChanges$.subscribe((lang) => {
      this._language.set(this.normalize(lang));
    });

    effect(() => {
      const current = this._language();
      if (this.transloco.getActiveLang() !== current) {
        this.transloco.setActiveLang(current);
      }
    });
  }

  public set(next: Language): void {
    this._language.set(next);
  }

  public toggle(): void {
    this._language.update((current) => (current === 'en' ? 'it' : 'en'));
  }

  private normalize(lang: string): Language {
    return AVAILABLE.includes(lang as Language) ? (lang as Language) : 'en';
  }
}
