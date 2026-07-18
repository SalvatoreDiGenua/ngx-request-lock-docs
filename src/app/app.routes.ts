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
    path: 'installation',
    loadComponent: () => import('./pages/installation/installation-page'),
    title: 'Installation and Setup | ngx-request-lock',
  },
  {
    path: 'directive-usage',
    loadComponent: () => import('./pages/directive-usage/directive-usage-page'),
    title: 'Directive Usage | ngx-request-lock',
  },
  {
    path: 'flow-lock',
    loadComponent: () => import('./pages/flow-lock/flow-lock-page'),
    title: 'Flow Lock Examples | ngx-request-lock',
  },
  { path: 'examples', redirectTo: 'directive-usage', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
