import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
    styles: [
        `
      :host {
        display: block;
        max-width: var(--screen-width);
        padding: 1rem;
        margin: auto;
        box-sizing: border-box;
      }
    `,
    ],
    standalone: false
})
export class AppComponent {}
