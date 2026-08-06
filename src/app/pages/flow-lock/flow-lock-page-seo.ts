import { RouteSeoData } from '../../core/services/seo-router-service';

export const FLOW_LOCK_PAGE_SEO: RouteSeoData = {
  description:
    'Flow lock patterns in ngx-request-lock: shared requestId across multiple buttons and chained HTTP calls, with reference-counted unlocking.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Flow Lock Examples — ngx-request-lock',
    description:
      'Flow lock patterns in ngx-request-lock: shared requestId across multiple buttons and chained HTTP calls, with reference-counted unlocking.',
    url: 'https://ngx-request-lock-docs.netlify.app/flow-lock',
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
