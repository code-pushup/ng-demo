import { Component } from '@angular/core';
import { ARTICLE_HEADER_TABS } from '../../../../constants/home-article-tabs.constant';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-article-header',

  template: `
    <header class="flex justify-between">
      <h1 class="subtitle">Posts</h1>
    
      <nav class="flex" aria-label="View posts by">
        <ul class="tabs-list flex">
          @for (tab of tabs; track tab) {
            <li>
              <a [class.active]="tab === selectedTab" class="tab-item pointer">{{
                tab | titlecase
              }}</a>
            </li>
          }
        </ul>
      </nav>
    </header>
    `,
  styles: [
    `
      .tabs-list {
        margin: 0;
        padding: 0;

        /*  todo: uncomment when tabs do something */
        display: none;
      }

      .tab-item {
        padding: 0.5rem;
        margin: 0 0.25rem;
        flex-direction: column;
        font-size: 1rem;
        transition: all cubic-bezier(0.17, 0.67, 0.5, 0.71) 100ms;
        border-radius: 5px;
        &.active {
          font-weight: 500;
          color: #08090a;
        }
        &:before {
          content: attr(data-text);
          height: 0;
          visibility: hidden;
          overflow: hidden;
          user-select: none;
          pointer-events: none;
        }
        &:after {
          position: absolute;
          content: '';
        }
      }
    `,
  ],
  imports: [TitleCasePipe],
})
export class ArticleHeaderComponent {
  selectedTab = 'feed';
  tabs = ARTICLE_HEADER_TABS;
}
