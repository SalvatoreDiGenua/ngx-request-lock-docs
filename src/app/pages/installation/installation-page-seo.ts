import { RouteSeoData } from '../../core/services/seo-router-service';

export const INSTALLATION_PAGE_SEO: RouteSeoData = {
  description:
    'Step-by-step installation and setup guide for ngx-request-lock in Angular applications using provideRequestLock and standalone configuration.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Installation & Setup — ngx-request-lock',
    description:
      'Step-by-step installation and setup guide for ngx-request-lock in Angular applications using provideRequestLock and standalone configuration.',
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
