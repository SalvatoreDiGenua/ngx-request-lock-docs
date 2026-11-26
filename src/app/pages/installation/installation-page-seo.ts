import { RouteSeoData } from '../../core/services/seo-router-service';

export const INSTALLATION_PAGE_SEO: RouteSeoData = {
  title: 'Install ngx-request-lock in Angular 22+ | Setup guide',
  description:
    'Install ngx-request-lock for Angular 22+. Register provideRequestLock, attach HttpContext to an HTTP call, and disable a button with ngxRequestLock.',
  ogTitle: 'Install ngx-request-lock in Angular 22+ | Setup guide',
  ogDescription:
    'Install the package, register its functional interceptor and connect a button to an Angular HttpClient request.',
  twitterTitle: 'Install ngx-request-lock in Angular 22+ | Setup guide',
  twitterDescription:
    'Install the package, register its functional interceptor and connect a button to an Angular HttpClient request.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Install ngx-request-lock in Angular 22+',
      description:
        'Install ngx-request-lock for Angular 22+. Register provideRequestLock, attach HttpContext to an HTTP call, and disable a button with ngxRequestLock.',
      url: 'https://ngx-request-lock-docs.netlify.app/installation/',
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
          name: 'Installation and Setup',
          item: 'https://ngx-request-lock-docs.netlify.app/installation/',
        },
      ],
    },
  ],
};
