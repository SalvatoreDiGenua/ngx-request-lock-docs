import { RouteSeoData } from '../../core/services/seo-router-service';

export const PROBLEM_PAGE_SEO: RouteSeoData = {
  description:
    'Why unblocked UI elements cause duplicate HTTP requests, state divergence, and stale loading flags in Angular apps — and how ngx-request-lock fixes it.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Problem Statement — Angular UI & HTTP Lifecycle Coupling',
    description:
      'Why unblocked UI elements cause duplicate HTTP requests, state divergence, and stale loading flags in Angular apps — and how ngx-request-lock fixes it.',
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
