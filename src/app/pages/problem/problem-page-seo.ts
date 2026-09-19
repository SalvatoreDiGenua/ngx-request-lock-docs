import { RouteSeoData } from '../../core/services/seo-router-service';

export const PROBLEM_PAGE_SEO: RouteSeoData = {
  title: 'Prevent Duplicate HTTP Requests in Angular | ngx-request-lock',
  description:
    'Why unblocked UI elements cause duplicate HTTP requests, state divergence, and stale loading flags in Angular apps - and how ngx-request-lock fixes it.',
  ogTitle:
    'Problem Statement - UI & HTTP Lifecycle Coupling | ngx-request-lock',
  ogDescription:
    'Learn why manual boolean flags fail when handling concurrent clicks and asynchronous HTTP flows in Angular applications.',
  twitterTitle:
    'Problem Statement - UI & HTTP Lifecycle Coupling | ngx-request-lock',
  twitterDescription:
    'Learn why manual boolean flags fail when handling concurrent clicks and asynchronous HTTP flows in Angular applications.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Problem Statement - Angular UI & HTTP Lifecycle Coupling',
      description:
        'Why unblocked UI elements cause duplicate HTTP requests, state divergence, and stale loading flags in Angular apps - and how ngx-request-lock fixes it.',
      url: 'https://ngx-request-lock-docs.netlify.app/problem/',
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
          name: 'Problem Statement',
          item: 'https://ngx-request-lock-docs.netlify.app/problem/',
        },
      ],
    },
  ],
};
