import { Service, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from './seo-service';

export interface RouteSeoData {
  description?: string;
  structuredData?: Record<string, unknown>;
}

@Service()
export class SeoRouterService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);

  init(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe(() => {
        this.updateSeo();
      });

    // Run initial update for the active route (including SSR prerendering)
    this.updateSeo();
  }

  private updateSeo(): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    this.seoService.setCanonicalUrl(this.buildCanonicalPath());

    const seoData = route.snapshot.data['seo'] as RouteSeoData | undefined;
    if (!seoData) {
      return;
    }

    if (seoData.description) {
      this.seoService.setMetaDescription(seoData.description);
    }
    if (seoData.structuredData) {
      this.seoService.setStructuredData(seoData.structuredData);
    }
  }

  /**
   * Normalizes the current router URL into the canonical path form used
   * across sitemap, structured data and physical SSG output: root stays
   * "/", every other route gets a trailing slash and no query/fragment.
   */
  private buildCanonicalPath(): string {
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams = {};
    urlTree.fragment = null;

    const path = urlTree.toString();

    if (path === '' || path === '/') {
      return '/';
    }

    return path.endsWith('/') ? path : `${path}/`;
  }
}
