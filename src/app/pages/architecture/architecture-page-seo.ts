import { RouteSeoData } from '../../core/services/seo-router-service';

export const ARCHITECTURE_PAGE_SEO: RouteSeoData = {
  title: 'Angular HTTP interceptor and signals | ngx-request-lock',
  description:
    'Understand how Angular HttpContext, a functional interceptor and signals track pending requests per ID and update buttons in ngx-request-lock.',
  ogTitle: 'Angular HTTP interceptor and signals | ngx-request-lock',
  ogDescription:
    'Trace a request ID through Angular HttpContext, the interceptor and a signal that tracks pending HTTP calls.',
  twitterTitle: 'Angular HTTP interceptor and signals | ngx-request-lock',
  twitterDescription:
    'Trace a request ID through Angular HttpContext, the interceptor and a signal that tracks pending HTTP calls.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'How an Angular HTTP interceptor tracks button loading state',
      description:
        'Understand how Angular HttpContext, a functional interceptor and signals track pending requests per ID and update buttons in ngx-request-lock.',
      url: 'https://ngx-request-lock-docs.netlify.app/architecture/',
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
          name: 'Architecture',
          item: 'https://ngx-request-lock-docs.netlify.app/architecture/',
        },
      ],
    },
  ],
};
