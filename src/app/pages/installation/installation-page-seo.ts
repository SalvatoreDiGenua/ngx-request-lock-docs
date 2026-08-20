import { RouteSeoData } from '../../core/services/seo-router-service';

export const INSTALLATION_PAGE_SEO: RouteSeoData = {
  title: 'Installation and Setup | ngx-request-lock',
  description:
    'Install ngx-request-lock in an Angular app: package setup, provideRequestLock() registration, HTTP context wiring, and directive placement.',
  keywords: [
    'npm install ngx-request-lock',
    'provideRequestLock',
    'angular installation',
    'angular package setup',
    'http context wiring',
  ],
  ogTitle: 'Installation & Setup Guide — ngx-request-lock',
  ogDescription:
    'Step-by-step guide to installing ngx-request-lock via npm/yarn/pnpm and configuring providers in Angular standalone applications.',
  twitterTitle: 'Installation & Setup Guide — ngx-request-lock',
  twitterDescription:
    'Step-by-step guide to installing ngx-request-lock via npm/yarn/pnpm and configuring providers in Angular standalone applications.',
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'Installation & Setup — ngx-request-lock',
      description:
        'Install ngx-request-lock in an Angular app: package setup, provideRequestLock() registration, HTTP context wiring, and directive placement.',
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

