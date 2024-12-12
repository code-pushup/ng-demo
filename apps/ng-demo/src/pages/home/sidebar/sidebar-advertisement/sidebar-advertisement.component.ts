import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-advertisement',
  template: `
    <div>
      <a href="https://angular.dev"
        ><img
          src="/assets/angular.gif"
          style="margin-top: 15px"
          class="w-100"
          loading="lazy" /></a
      ><a href="https://angular.dev/">
        <h2 class="m-0 ad-decription">New Angular is Here!</h2>
      </a>
    </div>
  `,
  styles: [
    `
      .ad-decription {
        text-align: center;
        line-height: 1.29em;
      }
    `,
  ],
})
export class SidebarAdvertisementComponent {}
