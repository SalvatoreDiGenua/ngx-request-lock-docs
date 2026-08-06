import { RouteSeoData } from '../../core/services/seo-router-service';

export const DIRECTIVE_USAGE_PAGE_SEO: RouteSeoData = {
  description:
    '[ngxRequestLock] directive usage in Angular: disabling buttons during HTTP requests, pending state spinners, and custom loading animations.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Directive Usage — ngx-request-lock',
    description:
      '[ngxRequestLock] directive usage in Angular: disabling buttons during HTTP requests, pending state spinners, and custom loading animations.',
    url: 'https://ngx-request-lock-docs.netlify.app/directive-usage',
    author: {
      '@type': 'Person',
      name: 'Salvatore Di Genua',
      url: 'https://github.com/SalvatoreDiGenua',
    },
    isPartOf: {
      '@type': 'SoftwareSourceCode',
      name: 'ngx-request-lock',
      url: 'https://ngx-request-lock-docs.netlify.app/',
    },
  },
};
