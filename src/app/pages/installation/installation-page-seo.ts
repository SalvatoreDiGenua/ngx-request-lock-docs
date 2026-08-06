import { RouteSeoData } from '../../core/services/seo-router-service';

export const INSTALLATION_PAGE_SEO: RouteSeoData = {
  description:
    'Install ngx-request-lock in an Angular app: package setup, provideRequestLock() registration, HTTP context wiring, and directive placement.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Installation & Setup — ngx-request-lock',
    description:
      'Install ngx-request-lock in an Angular app: package setup, provideRequestLock() registration, HTTP context wiring, and directive placement.',
    url: 'https://ngx-request-lock-docs.netlify.app/installation',
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
