import { RouteSeoData } from '../../core/services/seo-router-service';

export const PROBLEM_PAGE_SEO: RouteSeoData = {
  description:
    'Understand common pitfalls in Angular HTTP request state management and how ngx-request-lock eliminates manual loading flags and race conditions.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Problem Statement — Angular UI & HTTP Lifecycle Coupling',
    description:
      'Understand common pitfalls in Angular HTTP request state management and how ngx-request-lock eliminates manual loading flags and race conditions.',
    url: 'https://ngx-request-lock-docs.netlify.app/problem',
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
};
