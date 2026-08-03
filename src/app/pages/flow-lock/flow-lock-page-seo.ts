import { RouteSeoData } from '../../core/services/seo-router-service';

export const FLOW_LOCK_PAGE_SEO: RouteSeoData = {
  description:
    'Discover advanced Flow Lock examples: coordinating multi-step UI flows and multi-request HTTP lifecycles seamlessly with ngx-request-lock.',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Flow Lock Examples — ngx-request-lock',
    description:
      'Discover advanced Flow Lock examples: coordinating multi-step UI flows and multi-request HTTP lifecycles seamlessly with ngx-request-lock.',
    url: 'https://ngx-request-lock-docs.netlify.app/flow-lock',
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
