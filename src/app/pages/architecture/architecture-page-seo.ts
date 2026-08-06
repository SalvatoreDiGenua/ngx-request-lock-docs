import { RouteSeoData } from '../../core/services/seo-router-service';

export const ARCHITECTURE_PAGE_SEO: RouteSeoData = {
  description:
    'Architecture of ngx-request-lock: HttpContextToken, functional interceptor, reference-counted signal service, and RequestLockDirective.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Architecture — ngx-request-lock',
    description:
      'Architecture of ngx-request-lock: HttpContextToken, functional interceptor, reference-counted signal service, and RequestLockDirective.',
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
