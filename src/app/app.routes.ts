import { Routes } from '@angular/router';
import { RouteSeoData } from './core/seo-router.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home-page'),
    title: 'Home | ngx-request-lock',
    data: {
      seo: {
        description:
          'ngx-request-lock is an Angular library that binds a UI flow to the lifecycle of its HTTP requests: a shared requestId coordinates every element and request.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: 'ngx-request-lock',
          description:
            'ngx-request-lock is an Angular library that binds a UI flow to the lifecycle of its HTTP requests: a shared requestId coordinates every element and every request in the flow, with no manual loading flags.',
          programmingLanguage: 'TypeScript',
          runtimePlatform: 'Angular 22',
          license:
            'https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/blob/main/LICENSE',
          codeRepository:
            'https://github.com/SalvatoreDiGenua/ngx-request-lock-docs/tree/main/projects/ngx-request-lock',
          url: 'https://ngx-request-lock-docs.netlify.app/',
          sameAs: 'https://www.npmjs.com/package/ngx-request-lock',
          author: {
            '@type': 'Person',
            name: 'Salvatore Di Genua',
            url: 'https://github.com/SalvatoreDiGenua',
          },
        },
      } as RouteSeoData,
    },
  },
  {
    path: 'problem',
    loadComponent: () => import('./pages/problem/problem-page'),
    title: 'Problem Statement | ngx-request-lock',
    data: {
      seo: {
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
      } as RouteSeoData,
    },
  },
  {
    path: 'architecture',
    loadComponent: () => import('./pages/architecture/architecture-page'),
    title: 'Architecture | ngx-request-lock',
    data: {
      seo: {
        description:
          'Learn the core architecture of ngx-request-lock: HttpContextTokens, functional interceptor, reference counting, and signal-based UI directives.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Architecture — ngx-request-lock',
          description:
            'Learn the core architecture of ngx-request-lock: HttpContextTokens, functional interceptor, reference counting, and signal-based UI directives.',
          url: 'https://ngx-request-lock-docs.netlify.app/architecture',
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
      } as RouteSeoData,
    },
  },
  {
    path: 'installation',
    loadComponent: () => import('./pages/installation/installation-page'),
    title: 'Installation and Setup | ngx-request-lock',
    data: {
      seo: {
        description:
          'Step-by-step installation and setup guide for ngx-request-lock in Angular applications using provideRequestLock and standalone configuration.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Installation & Setup — ngx-request-lock',
          description:
            'Step-by-step installation and setup guide for ngx-request-lock in Angular applications using provideRequestLock and standalone configuration.',
          url: 'https://ngx-request-lock-docs.netlify.app/installation',
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
      } as RouteSeoData,
    },
  },
  {
    path: 'directive-usage',
    loadComponent: () => import('./pages/directive-usage/directive-usage-page'),
    title: 'Directive Usage | ngx-request-lock',
    data: {
      seo: {
        description:
          'Explore how to use [ngxRequestLock] directive to automatically manage loading states, disabled attributes, and button spinners in Angular forms.',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: 'Directive Usage — ngx-request-lock',
          description:
            'Explore how to use [ngxRequestLock] directive to automatically manage loading states, disabled attributes, and button spinners in Angular forms.',
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
      } as RouteSeoData,
    },
  },
  {
    path: 'flow-lock',
    loadComponent: () => import('./pages/flow-lock/flow-lock-page'),
    title: 'Flow Lock Examples | ngx-request-lock',
    data: {
      seo: {
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
      } as RouteSeoData,
    },
  },
  { path: 'examples', redirectTo: 'directive-usage', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
