import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { ArticleContainerComponent } from './articles/article-container/article-container.component';
import { RightbarContainerComponent } from './rightbar/rightbar-container/rightbar-container.component';

@Component({
  selector: 'app-home',

  template: `
    <app-sidebar />
    <app-article-container />
    <app-rightbar-container />
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: 240px 2fr 1fr;
      }
    `,
  ],
  imports: [
    SidebarComponent,
    ArticleContainerComponent,
    RightbarContainerComponent,
  ],
})
export default class HomeComponent {}
