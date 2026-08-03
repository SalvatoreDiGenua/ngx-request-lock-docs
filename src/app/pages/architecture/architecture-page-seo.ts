import { RouteSeoData } from '../../core/services/seo-router-service';

export const ARCHITECTURE_PAGE_SEO: RouteSeoData = {
  description:
    'Learn the core architecture of ngx-request-lock: HttpContextTokens, functional interceptor, reference counting, and signal-based UI directives.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Architecture — ngx-request-lock',
    description:
      'Learn the core architecture of ngx-request-lock: HttpContextTokens, functional interceptor, reference counting, and signal-based UI directives.',
    url: 'https://ngx-request-lock-docs.netlify.app/architecture',
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
