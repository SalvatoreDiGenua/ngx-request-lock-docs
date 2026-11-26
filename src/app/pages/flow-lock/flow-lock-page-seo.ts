import { RouteSeoData } from '../../core/services/seo-router-service';

export const FLOW_LOCK_PAGE_SEO: RouteSeoData = {
  title: 'Lock Angular forms across HTTP requests | ngx-request-lock',
  description:
    'Share one requestId across Angular form buttons and related POST and GET calls. See how reference counting tracks pending requests in a UI flow.',
  ogTitle: 'Lock Angular forms across HTTP requests | ngx-request-lock',
  ogDescription:
    'Share one requestId across Angular buttons and POST and GET calls, with a pending-request signal for the flow.',
  twitterTitle: 'Lock Angular forms across HTTP requests | ngx-request-lock',
  twitterDescription:
    'Share one requestId across Angular buttons and POST and GET calls, with a pending-request signal for the flow.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Coordinate Angular form buttons across chained HTTP requests',
      description:
        'Share one requestId across Angular form buttons and related POST and GET calls. See how reference counting tracks pending requests in a UI flow.',
      url: 'https://ngx-request-lock-docs.netlify.app/flow-lock/',
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
          item: 'https://ngx-request-lock-docs.netlify.app/flow-lock/',
        },
      ],
    },
  ],
};
