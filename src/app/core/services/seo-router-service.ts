import { Service, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SeoService } from './seo-service';

export interface RouteSeoData {
  /** Document <title>. Single source of truth: routes reuse it. */
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
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
    const pageTitle =
      seoData?.title ?? route.snapshot.title ?? 'ngx-request-lock';
    const description =
      seoData?.description ??
      'ngx-request-lock is an Angular library for binding UI flows to HTTP request lifecycles.';

    this.seoService.setMetaDescription(description);

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
   * across sitemap, structured data and <link rel="canonical">: every path
   * ends with a trailing slash ("/", "/problem/", ...) and carries no
   * query string or fragment.
   *
   * The trailing slash is deliberate: SSG emits `problem/index.html`, and
   * Netlify answers `/problem` with a 301 to `/problem/`. Declaring the
   * slash-terminated URL as canonical keeps HTML, sitemap and hosting
   * behaviour consistent.
   */
  private buildCanonicalPath(): string {
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams = {};
    urlTree.fragment = null;

    const path = urlTree.toString().replace(/\/+$/, '');

    return `${path}/`;
  }
}
