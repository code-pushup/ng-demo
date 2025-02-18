import { Component } from '@angular/core';
import { SidebarSocialLinksComponent } from '../sidebar-social-links/sidebar-social-links.component';
import { SidebarTagsComponent } from '../sidebar-tags/sidebar-tags.component';
import { SidebarAdvertisementComponent } from '../sidebar-advertisement/sidebar-advertisement.component';

@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styles: [
    `
      :host {
        display: block;
        width: 240px;
      }
      a {
        width: 100%;
        padding: 0.5rem;
        display: inline-flex;
        align-items: center;
        color: #202428;
        border-radius: 5px;
        &:hover,
        &:active {
          background-color: rgba(8, 9, 10, 0.05);
          color: #e32fcf;
        }
      }

      .sidebar-link-icon {
        display: grid;
        justify-content: center;
        align-content: center;
        margin-right: 0.5rem;
        vertical-align: middle;
        width: 1.5rem;
        height: 1.5rem;
        font-size: 1.25rem;
      }

      .icon-image {
        width: 1.5rem;
        height: 1.5rem;
      }
    `,
  ],
  imports: [
    SidebarSocialLinksComponent,
    SidebarTagsComponent,
    SidebarAdvertisementComponent,
  ],
})
export class SidebarComponent {}
