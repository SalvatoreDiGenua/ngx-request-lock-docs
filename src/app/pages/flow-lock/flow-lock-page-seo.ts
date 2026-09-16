import { RouteSeoData } from '../../core/services/seo-router-service';

export const FLOW_LOCK_PAGE_SEO: RouteSeoData = {
  title: 'Flow Lock Examples | ngx-request-lock',
  description:
    'Flow lock patterns in ngx-request-lock: shared requestId across multiple buttons and chained HTTP calls, with reference-counted unlocking.',
  keywords: [
    'flow lock pattern',
    'chained http requests',
    'shared request id',
    'reference counted lock',
    'angular flow lock',
    'batch requests lock',
  ],
  ogTitle: 'Flow Lock Pattern Examples — ngx-request-lock',
  ogDescription:
    'Explore complex multi-button coordination and chained HTTP request flows with reference-counted locking in Angular.',
  twitterTitle: 'Flow Lock Pattern Examples — ngx-request-lock',
  twitterDescription:
    'Explore complex multi-button coordination and chained HTTP request flows with reference-counted locking in Angular.',
  structuredData: [
    {
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
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://ngx-request-lock-docs.netlify.app/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Flow Lock Examples',
          item: 'https://ngx-request-lock-docs.netlify.app/flow-lock',
        },
      ],
    },
  ],
};
