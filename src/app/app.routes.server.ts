import { RenderMode, ServerRoute } from '@angular/ssr';

import { NAV_GROUPS } from './core/layout/nav-items';

export const serverRoutes: ServerRoute[] = [
  ...NAV_GROUPS.flatMap(({ items }) =>
    items.flatMap<ServerRoute>(({ route }) => [
      { path: route.slice(1), renderMode: RenderMode.Prerender },
      {
        path: route === '/' ? 'it' : `it${route}`,
        renderMode: RenderMode.Prerender,
      },
    ]),
  ),
  { path: 'examples', renderMode: RenderMode.Server, status: 301 },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
