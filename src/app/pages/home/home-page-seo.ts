import { RouteSeoData } from '../../core/services/seo-router-service';

export const HOME_PAGE_SEO: RouteSeoData = {
  title: 'Angular HTTP loading and button locking | ngx-request-lock',
  description:
    'Disable Angular buttons during HTTP requests with ngx-request-lock. Use an interceptor, HttpContext and signals to coordinate loading state across a flow.',
  ogTitle: 'Angular HTTP loading and button locking | ngx-request-lock',
  ogDescription:
    'Disable buttons while Angular HTTP requests are pending and coordinate related actions with a shared requestId.',
  twitterTitle: 'Angular HTTP loading and button locking | ngx-request-lock',
  twitterDescription:
    'Disable buttons while Angular HTTP requests are pending and coordinate related actions with a shared requestId.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'ngx-request-lock',
    description:
      'ngx-request-lock is an Angular library that disables buttons during tagged HTTP requests and exposes a signal for loading state across related actions.',
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
