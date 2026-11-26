import { Routes } from '@angular/router';
import { HOME_PAGE_SEO } from './pages/home/home-page-seo';
import { PROBLEM_PAGE_SEO } from './pages/problem/problem-page-seo';
import { ARCHITECTURE_PAGE_SEO } from './pages/architecture/architecture-page-seo';
import { INSTALLATION_PAGE_SEO } from './pages/installation/installation-page-seo';
import { DIRECTIVE_USAGE_PAGE_SEO } from './pages/directive-usage/directive-usage-page-seo';
import { FLOW_LOCK_PAGE_SEO } from './pages/flow-lock/flow-lock-page-seo';
import { activateLanguage } from './core/i18n/locale-routes';
import { localizedSeo } from './core/services/localized-seo';

const contentRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home-page'),
    title: HOME_PAGE_SEO.title,
    data: {
      seo: HOME_PAGE_SEO,
    },
  },
  {
    path: 'problem',
    loadComponent: () => import('./pages/problem/problem-page'),
    title: PROBLEM_PAGE_SEO.title,
    data: {
      seo: PROBLEM_PAGE_SEO,
    },
  },
  {
    path: 'architecture',
    loadComponent: () => import('./pages/architecture/architecture-page'),
    title: ARCHITECTURE_PAGE_SEO.title,
    data: {
      seo: ARCHITECTURE_PAGE_SEO,
    },
  },
  {
    path: 'installation',
    loadComponent: () => import('./pages/installation/installation-page'),
    title: INSTALLATION_PAGE_SEO.title,
    data: {
      seo: INSTALLATION_PAGE_SEO,
    },
  },
  {
    path: 'directive-usage',
    loadComponent: () => import('./pages/directive-usage/directive-usage-page'),
    title: DIRECTIVE_USAGE_PAGE_SEO.title,
    data: {
      seo: DIRECTIVE_USAGE_PAGE_SEO,
    },
  },
  {
    path: 'flow-lock',
    loadComponent: () => import('./pages/flow-lock/flow-lock-page'),
    title: FLOW_LOCK_PAGE_SEO.title,
    data: {
      seo: FLOW_LOCK_PAGE_SEO,
    },
  },
];

const italianCopy = [
  {
    title: 'Richieste HTTP Angular: blocca i pulsanti | ngx-request-lock',
    description:
      'Disabilita i pulsanti Angular durante le richieste HTTP con una direttiva, interceptor e signal. Esempi per click, form e chiamate concatenate.',
  },
  {
    title: 'Evitare richieste HTTP duplicate in Angular | ngx-request-lock',
    description:
      'Scopri come evitare doppi click e richieste HTTP duplicate in Angular: blocca la UI durante il caricamento e riabilitala anche in caso di errore.',
    breadcrumb: 'Richieste duplicate',
  },
  {
    title: 'Interceptor HTTP Angular e signal | ngx-request-lock',
    description:
      'Come funziona ngx-request-lock: HttpContextToken identifica il flusso, l’interceptor conta le richieste e un signal aggiorna i pulsanti.',
    breadcrumb: 'Architettura',
  },
  {
    title: 'Installare ngx-request-lock in Angular | Guida',
    description:
      'Installa ngx-request-lock in Angular 22+: configura provideRequestLock, collega HttpContext alle chiamate HTTP e applica la direttiva ai pulsanti.',
    breadcrumb: 'Installazione',
  },
  {
    title: 'Disabilitare pulsanti durante HTTP in Angular | Guida',
    description:
      'Esempi Angular con ngxRequestLock: disabilita il pulsante durante una richiesta HTTP, mostra lo stato di caricamento e gestisci salvataggio e form.',
    breadcrumb: 'Direttiva ngxRequestLock',
  },
  {
    title: 'Bloccare form e richieste HTTP concatenate in Angular',
    description:
      'Usa un requestId condiviso per bloccare più pulsanti Angular durante POST e GET concatenati. Il conteggio delle richieste coordina lo stato della UI.',
    breadcrumb: 'Flussi HTTP',
  },
] as const;

export const routes: Routes = [
  ...contentRoutes.map((route) => ({
    ...route,
    canActivate: [activateLanguage('en')],
    data: { ...route.data, language: 'en' },
  })),
  // Client-side navigation preserves the final empty URL segment in `/it/`.
  // Normalize it before matching the Italian parent's empty home route.
  { path: 'it/', redirectTo: 'it', pathMatch: 'full' },
  {
    path: 'it',
    children: [
      ...contentRoutes.map((route, index) => ({
        ...route,
        canActivate: [activateLanguage('it')],
        title: italianCopy[index].title,
        data: {
          seo: localizedSeo(
            route.data?.['seo'],
            route.path === '' ? '/' : `/${route.path}/`,
            'it',
            italianCopy[index],
          ),
          language: 'it',
        },
      })),
      {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found-page'),
        canActivate: [activateLanguage('it')],
        title: 'Pagina non trovata | ngx-request-lock',
        data: { noIndex: true, language: 'it' },
      },
    ],
  },
  { path: 'examples', redirectTo: 'directive-usage/', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found-page'),
    canActivate: [activateLanguage('en')],
    title: 'Page not found | ngx-request-lock',
    data: { noIndex: true, language: 'en' },
  },
];
