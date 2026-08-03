import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Service()
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);

  setMetaDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setStructuredData(data: Record<string, unknown>): void {
    const existingScripts = this.document.head.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    existingScripts.forEach((script) => script.remove());

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    this.document.head.appendChild(script);
  }
}
