import { RouteSeoData } from '../../core/services/seo-router-service';

export const HOME_PAGE_SEO: RouteSeoData = {
  title: 'ngx-request-lock — Angular UI/HTTP Request Lifecycle Binding',
  description:
    'Angular library that binds UI flows to HTTP request lifecycles. One shared requestId locks buttons, forms and panels and unlocks them when requests settle.',
  ogTitle: 'ngx-request-lock — Angular UI/HTTP Request Lifecycle Binding',
  ogDescription:
    'Declarative UI disabling and pending state management tied directly to Angular HTTP requests using Signals and reference counting.',
  twitterTitle: 'ngx-request-lock — Angular UI/HTTP Request Lifecycle Binding',
  twitterDescription:
    'Declarative UI disabling and pending state management tied directly to Angular HTTP requests using Signals and reference counting.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'ngx-request-lock',
    description:
      'ngx-request-lock: Angular library for binding UI flows to HTTP request lifecycles. A shared requestId coordinates buttons, forms, and panels, unlocking them automatically when requests settle.',
    programmingLanguage: 'TypeScript',
    runtimePlatform: 'Angular 22',
    license:
      'https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/blob/main/LICENSE',
    codeRepository:
      'https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/tree/main/projects/ngx-request-lock',
    url: 'https://ngx-request-lock-docs.netlify.app/',
    sameAs: 'https://www.npmjs.com/package/ngx-request-lock',
    author: {
      '@type': 'Person',
      name: 'Salvatore Di Genua',
      url: 'https://github.com/SalvatoreDiGenua',
    },
  },
};
