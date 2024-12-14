import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',

  template: `
    <app-header />
    <router-outlet />
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
  imports: [HeaderComponent, RouterOutlet],
})
export class AppComponent {}
