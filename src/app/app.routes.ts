import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home-page'),
    title: 'Home | ngx-request-lock',
  },
  {
    path: 'problem',
    loadComponent: () => import('./pages/problem/problem-page'),
    title: 'Problem Statement | ngx-request-lock',
  },
  {
    path: 'architecture',
    loadComponent: () => import('./pages/architecture/architecture-page'),
    title: 'Architecture | ngx-request-lock',
  },
  {
    path: 'why-angular-native',
    loadComponent: () =>
      import('./pages/why-angular-native/why-angular-native-page'),
    title: 'Why Angular-native | ngx-request-lock',
  },
  {
    path: 'installation',
    loadComponent: () => import('./pages/installation/installation-page'),
    title: 'Installation and Setup | ngx-request-lock',
  },
  {
    path: 'examples',
    loadComponent: () => import('./pages/examples/examples-page'),
    title: 'Usage Examples | ngx-request-lock',
  },
  {
    path: 'advantages',
    loadComponent: () => import('./pages/advantages/advantages-page'),
    title: 'Advantages | ngx-request-lock',
  },
  {
    path: 'limitations',
    loadComponent: () => import('./pages/limitations/limitations-page'),
    title: 'Limitations | ngx-request-lock',
  },
  {
    path: 'api',
    loadComponent: () => import('./pages/api-reference/api-reference-page'),
    title: 'API Reference | ngx-request-lock',
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq-page'),
    title: 'FAQ | ngx-request-lock',
  },
  { path: '**', redirectTo: '' },
];
