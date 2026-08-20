import { Service, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from './seo-service';

export interface RouteSeoData {
  title?: string;
  description?: string;
  keywords?: string | string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
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

    const canonicalPath = this.buildCanonicalPath();
    this.seoService.setCanonicalUrl(canonicalPath);

    const seoData = route.snapshot.data['seo'] as RouteSeoData | undefined;
    const pageTitle = seoData?.title ?? route.snapshot.title ?? 'ngx-request-lock';
    const description =
      seoData?.description ??
      'ngx-request-lock is an Angular library for binding UI flows to HTTP request lifecycles.';

    this.seoService.setMetaDescription(description);

    if (seoData?.keywords) {
      this.seoService.setKeywords(seoData.keywords);
    }

    this.seoService.setOpenGraph({
      title: seoData?.ogTitle ?? pageTitle,
      description: seoData?.ogDescription ?? description,
      image: seoData?.ogImage,
      type: seoData?.ogType ?? 'website',
    });

    this.seoService.setTwitterCard({
      card: seoData?.twitterCard ?? 'summary_large_image',
      title: seoData?.twitterTitle ?? pageTitle,
      description: seoData?.twitterDescription ?? description,
      image: seoData?.twitterImage,
    });

    if (seoData?.structuredData) {
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
