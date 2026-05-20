import { DOCUMENT, inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StructuredDataService {
  private readonly doc = inject(DOCUMENT);

  set(data: object, id: string): void {
    this.remove(id);
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = `ld-${id}`;
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  remove(id: string): void {
    this.doc.getElementById(`ld-${id}`)?.remove();
  }
}
