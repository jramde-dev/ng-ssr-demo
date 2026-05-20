import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  setSeoData(data: SeoData): void {
    const title = data.title ? `${data.title} | Vivre Volaille` : 'Vivre Volaille';
    this.title.setTitle(title);

    this.updateMeta('description', data.description);

    // Open Graph
    this.updateMeta('og:title', title, true);
    this.updateMeta('og:description', data.description, true);
    this.updateMeta('og:image', data.imageUrl, true);
    this.updateMeta('og:url', data.url, true);
    this.updateMeta('og:type', data.type ?? 'website', true);

    // Twitter Card
    this.updateMeta('twitter:card', 'summary_large_image', true);
    this.updateMeta('twitter:title', title, true);
    this.updateMeta('twitter:description', data.description, true);
    this.updateMeta('twitter:image', data.imageUrl, true);

    // Robots
    this.updateMeta('robots', data.noIndex ? 'noindex,nofollow' : 'index,follow');

    // Canonical
    this.updateCanonicalUrl(data.url);
  }

  private updateMeta(name: string, content?: string, isProperty = false): void {
    if (!content) {
      this.meta.removeTag(isProperty ? `property="${name}"` : `name="${name}"`);
      return;
    }

    const selector = isProperty ? `property="${name}"` : `name="${name}"`;
    if (this.meta.getTag(selector)) {
      isProperty
        ? this.meta.updateTag({ property: name, content })
        : this.meta.updateTag({ name, content });
    } else {
      isProperty
        ? this.meta.addTag({ property: name, content })
        : this.meta.addTag({ name, content });
    }
  }

  private updateCanonicalUrl(url?: string): void {
    this.doc.querySelector('link[rel="canonical"]')?.remove();

    if (url) {
      const link = this.doc.createElement('link');
      link.rel = 'canonical';
      link.href = url;
      this.doc.head.appendChild(link);
    }
  }
}
