import { RouteSeoData } from '../../core/services/seo-router-service';

export const HOME_PAGE_SEO: RouteSeoData = {
  description:
    'ngx-request-lock is an Angular library that binds a UI flow to the lifecycle of its HTTP requests: a shared requestId coordinates every element and request.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'ngx-request-lock',
    description:
      'ngx-request-lock is an Angular library that binds a UI flow to the lifecycle of its HTTP requests: a shared requestId coordinates every element and every request in the flow, with no manual loading flags.',
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
