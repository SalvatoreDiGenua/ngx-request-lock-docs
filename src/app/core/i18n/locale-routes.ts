import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom, map } from 'rxjs';
import type { Language } from './language.service';

export const activateLanguage =
  (language: Language): CanActivateFn =>
  () => {
    const transloco = inject(TranslocoService);
    transloco.setActiveLang(language);
    return firstValueFrom(transloco.load(language).pipe(map(() => true)));
  };

export const localizedPath = (path: string, language: Language): string =>
  language === 'it' ? `/it${path === '/' ? '/' : path}` : path;
