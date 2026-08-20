import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

const SITE_ORIGIN = 'https://ngx-request-lock-docs.netlify.app';
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

export interface OpenGraphMeta {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

export interface TwitterCardMeta {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  title?: string;
  description?: string;
  image?: string;
}

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

  setKeywords(keywords: string | string[]): void {
    const content = Array.isArray(keywords) ? keywords.join(', ') : keywords;
    this.meta.updateTag({ name: 'keywords', content }, 'name="keywords"');
  }

  setOpenGraph(og: OpenGraphMeta): void {
    if (og.title) {
      this.meta.updateTag(
        { property: 'og:title', content: og.title },
        'property="og:title"',
      );
    }
    if (og.description) {
      this.meta.updateTag(
        { property: 'og:description', content: og.description },
        'property="og:description"',
      );
    }
    if (og.image) {
      this.meta.updateTag(
        { property: 'og:image', content: og.image },
        'property="og:image"',
      );
    } else {
      this.meta.updateTag(
        { property: 'og:image', content: DEFAULT_OG_IMAGE },
        'property="og:image"',
      );
    }
    if (og.type) {
      this.meta.updateTag(
        { property: 'og:type', content: og.type },
        'property="og:type"',
      );
    }
    if (og.url) {
      this.meta.updateTag(
        { property: 'og:url', content: og.url },
        'property="og:url"',
      );
    }
  }

  setTwitterCard(twitter: TwitterCardMeta): void {
    if (twitter.card) {
      this.meta.updateTag(
        { name: 'twitter:card', content: twitter.card },
        'name="twitter:card"',
      );
    }
    if (twitter.title) {
      this.meta.updateTag(
        { name: 'twitter:title', content: twitter.title },
        'name="twitter:title"',
      );
    }
    if (twitter.description) {
      this.meta.updateTag(
        { name: 'twitter:description', content: twitter.description },
        'name="twitter:description"',
      );
    }
    if (twitter.image) {
      this.meta.updateTag(
        { name: 'twitter:image', content: twitter.image },
        'name="twitter:image"',
      );
    } else {
      this.meta.updateTag(
        { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
        'name="twitter:image"',
      );
    }
  }

  setStructuredData(
    data: Record<string, unknown> | Record<string, unknown>[],
  ): void {
    const existingScripts = this.document.head.querySelectorAll(
      'script[type="application/ld+json"]:not([data-seo-persistent])',
    );
    existingScripts.forEach((script) => script.remove());

    const items = Array.isArray(data) ? data : [data];
    for (const item of items) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(item, null, 2);
      this.document.head.appendChild(script);
    }
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
