import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',

  imports: [RouterLink],
  template: `
    <img style="width: 50%" src="/assets/angular-logo.gif" />
    <h1>This page does not exist</h1>
    <a routerLink="/">Return to Home Page</a>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
   img {
     width: 100%;
     max-width: 256px;
   }
  `,
})
export default class NotFoundComponent {}
