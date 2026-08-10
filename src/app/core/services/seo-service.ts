import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

const SITE_ORIGIN = 'https://ngx-request-lock-docs.netlify.app';

@Service()
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);

  setMetaDescription(description: string): void {
    this.meta.updateTag(
      { name: 'description', content: description },
      'name="description"',
    );
  }

  setStructuredData(data: Record<string, unknown>): void {
    const existingScripts = this.document.head.querySelectorAll(
      'script[type="application/ld+json"]:not([data-seo-persistent])',
    );
    existingScripts.forEach((script) => script.remove());

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    this.document.head.appendChild(script);
  }

  /**
   * Aligns <link rel="canonical"> and og:url with the current route.
   * `path` must be the route path with a leading slash and, for every
   * route other than the home page, a trailing slash too
   * (e.g. "/", "/installation/", "/directive-usage/"),
   * to match the physical files produced by SSG and the sitemap entries.
   */
  setCanonicalUrl(path: string): void {
    const url = `${SITE_ORIGIN}${path}`;

    let link: HTMLLinkElement | null = this.document.head.querySelector(
      'link[rel="canonical"]',
    );

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);

    // Explicit selector: makes matching against the static <meta> tag
    // already present in index.html reliable, instead of relying on
    // Meta's internal attr-selector inference.
    this.meta.updateTag(
      { property: 'og:url', content: url },
      'property="og:url"',
    );
  }
}
