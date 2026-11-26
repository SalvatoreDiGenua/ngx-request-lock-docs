import { RouteSeoData } from '../../core/services/seo-router-service';

export const DIRECTIVE_USAGE_PAGE_SEO: RouteSeoData = {
  title: 'Disable Angular buttons during HTTP requests | Examples',
  description:
    'Use ngxRequestLock to disable an Angular button while an HTTP request runs. Follow working examples for click events, forms, loading labels and spinners.',
  ogTitle: 'Disable Angular buttons during HTTP requests | Examples',
  ogDescription:
    'See Angular code and live demos for disabling a button while an HTTP call runs, including form actions and loading labels.',
  twitterTitle: 'Disable Angular buttons during HTTP requests | Examples',
  twitterDescription:
    'See Angular code and live demos for disabling a button while an HTTP call runs, including form actions and loading labels.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Disable an Angular button while an HTTP request runs',
      description:
        'Use ngxRequestLock to disable an Angular button while an HTTP request runs. Follow working examples for click events, forms, loading labels and spinners.',
      url: 'https://ngx-request-lock-docs.netlify.app/directive-usage/',
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
          item: 'https://ngx-request-lock-docs.netlify.app/directive-usage/',
        },
      ],
    },
  ],
};
