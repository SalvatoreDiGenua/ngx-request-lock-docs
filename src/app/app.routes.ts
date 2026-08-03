import { Routes } from '@angular/router';
import { HOME_PAGE_SEO } from './pages/home/home-page-seo';
import { PROBLEM_PAGE_SEO } from './pages/problem/problem-page-seo';
import { ARCHITECTURE_PAGE_SEO } from './pages/architecture/architecture-page-seo';
import { INSTALLATION_PAGE_SEO } from './pages/installation/installation-page-seo';
import { DIRECTIVE_USAGE_PAGE_SEO } from './pages/directive-usage/directive-usage-page-seo';
import { FLOW_LOCK_PAGE_SEO } from './pages/flow-lock/flow-lock-page-seo';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home-page'),
    title: 'Home | ngx-request-lock',
    data: {
      seo: HOME_PAGE_SEO,
    },
  },
  {
    path: 'problem',
    loadComponent: () => import('./pages/problem/problem-page'),
    title: 'Problem Statement | ngx-request-lock',
    data: {
      seo: PROBLEM_PAGE_SEO,
    },
  },
  {
    path: 'architecture',
    loadComponent: () => import('./pages/architecture/architecture-page'),
    title: 'Architecture | ngx-request-lock',
    data: {
      seo: ARCHITECTURE_PAGE_SEO,
    },
  },
  {
    path: 'installation',
    loadComponent: () => import('./pages/installation/installation-page'),
    title: 'Installation and Setup | ngx-request-lock',
    data: {
      seo: INSTALLATION_PAGE_SEO,
    },
  },
  {
    path: 'directive-usage',
    loadComponent: () => import('./pages/directive-usage/directive-usage-page'),
    title: 'Directive Usage | ngx-request-lock',
    data: {
      seo: DIRECTIVE_USAGE_PAGE_SEO,
    },
  },
  {
    path: 'flow-lock',
    loadComponent: () => import('./pages/flow-lock/flow-lock-page'),
    title: 'Flow Lock Examples | ngx-request-lock',
    data: {
      seo: FLOW_LOCK_PAGE_SEO,
    },
  },
  { path: 'examples', redirectTo: 'directive-usage', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
