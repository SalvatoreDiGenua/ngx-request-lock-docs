import { RouteSeoData } from '../../core/services/seo-router-service';

export const DIRECTIVE_USAGE_PAGE_SEO: RouteSeoData = {
  title: 'Directive Usage | ngx-request-lock',
  description:
    '[ngxRequestLock] directive usage in Angular: disabling buttons during HTTP requests, pending state spinners, and custom loading animations.',
  keywords: [
    'ngxRequestLock directive',
    'angular button loading',
    'pending spinner directive',
    'disabled button http',
    'angular template directive',
  ],
  ogTitle: 'Directive Usage Guide — ngx-request-lock',
  ogDescription:
    'Complete guide to the [ngxRequestLock] directive: binding requestId to buttons, templates, inputs, and loading indicators.',
  twitterTitle: 'Directive Usage Guide — ngx-request-lock',
  twitterDescription:
    'Complete guide to the [ngxRequestLock] directive: binding requestId to buttons, templates, inputs, and loading indicators.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Directive Usage — ngx-request-lock',
      description:
        '[ngxRequestLock] directive usage in Angular: disabling buttons during HTTP requests, pending state spinners, and custom loading animations.',
      url: 'https://ngx-request-lock-docs.netlify.app/directive-usage',
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
          name: 'Directive Usage',
          item: 'https://ngx-request-lock-docs.netlify.app/directive-usage',
        },
      ],
    },
  ],
};
