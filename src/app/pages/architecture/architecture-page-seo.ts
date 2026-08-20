import { RouteSeoData } from '../../core/services/seo-router-service';

export const ARCHITECTURE_PAGE_SEO: RouteSeoData = {
  title: 'Architecture | ngx-request-lock',
  description:
    'Architecture of ngx-request-lock: HttpContextToken, functional interceptor, reference-counted signal service, and RequestLockDirective.',
  keywords: [
    'angular architecture',
    'http context token',
    'functional interceptor',
    'reference counting',
    'signals service',
    'request-lock architecture',
  ],
  ogTitle: 'Architecture Overview — ngx-request-lock',
  ogDescription:
    'Deep dive into the internal design of ngx-request-lock: HttpContextTokens, interceptors, signal maps, and directive bindings.',
  twitterTitle: 'Architecture Overview — ngx-request-lock',
  twitterDescription:
    'Deep dive into the internal design of ngx-request-lock: HttpContextTokens, interceptors, signal maps, and directive bindings.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Architecture — ngx-request-lock',
      description:
        'Architecture of ngx-request-lock: HttpContextToken, functional interceptor, reference-counted signal service, and RequestLockDirective.',
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

