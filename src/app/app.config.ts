import {
  ApplicationConfig,
  inject,
  isDevMode,
  PLATFORM_ID,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { provideRequestLock } from 'ngx-request-lock';

import { routes } from './app.routes';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';
import { provideClientHydration } from '@angular/platform-browser';
import { SeoRouterService } from './core/services/seo-router-service';
import { isPlatformBrowser } from '@angular/common';

class NoopStorage implements Storage {
  length = 0;
  clear(): void {
    //
  }
  getItem(): string | null {
    return null;
  }
  key(): string | null {
    return null;
  }
  removeItem(): void {
    //
  }
  setItem(): void {
    //
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withViewTransitions(),
    ),
    provideAppInitializer(() => inject(SeoRouterService).init()),
    // Registers HttpClient with the ngx-request-lock functional interceptor.
    // Do NOT add a separate provideHttpClient() call - it would override this.
    provideRequestLock(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'it'],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideTranslocoPersistLang({
      storage: {
        useFactory: (platformId: object) =>
          isPlatformBrowser(platformId) ? localStorage : new NoopStorage(),
        deps: [PLATFORM_ID],
      },
      storageKey: 'ngx-request-lock-docs.language',
    }),
    provideClientHydration(),
  ],
};
