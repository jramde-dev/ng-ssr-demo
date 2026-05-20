import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './layouts/layout';
import { SeoService } from './core/services/seo.service';
import { StructuredDataService } from './core/services/structured-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);

  constructor() {
    this.seo.setSeoData({
      title: 'Vivre Volaille',
      description: 'The best solution for your needs.',
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1600',
      url: 'https://jramde-dev.github.io/ng-ssr-demo/',
      type: 'website',
    });

    this.structuredData.set(
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Vivre Volaille',
        url: 'https://jramde-dev.github.io/ng-ssr-demo/',
        description: 'The best solution for your needs.',
      },
      'landing',
    );
  }
}
