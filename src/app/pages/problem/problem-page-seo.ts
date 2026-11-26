import { RouteSeoData } from '../../core/services/seo-router-service';

export const PROBLEM_PAGE_SEO: RouteSeoData = {
  title: 'Prevent duplicate HTTP requests in Angular | ngx-request-lock',
  description:
    'Prevent repeated clicks from sending duplicate Angular HTTP requests. Compare manual loading flags with a button lock tied to the request lifecycle.',
  ogTitle: 'Prevent duplicate HTTP requests in Angular | ngx-request-lock',
  ogDescription:
    'See how repeated clicks cause duplicate requests and how a request-scoped lock keeps related Angular buttons in sync.',
  twitterTitle: 'Prevent duplicate HTTP requests in Angular | ngx-request-lock',
  twitterDescription:
    'See how repeated clicks cause duplicate requests and how a request-scoped lock keeps related Angular buttons in sync.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Prevent duplicate HTTP requests in Angular',
      description:
        'Prevent repeated clicks from sending duplicate Angular HTTP requests. Compare manual loading flags with a button lock tied to the request lifecycle.',
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
