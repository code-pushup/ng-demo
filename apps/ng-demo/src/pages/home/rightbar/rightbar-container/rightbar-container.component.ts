import { Component } from '@angular/core';
import { HOME_TAGS } from '../../../../constants/home-tags.constant';

import { TagArticleComponent } from '../tag-article/tag-article.component';

@Component({
  selector: 'app-rightbar-container',

  template: `
    <aside>
      @for (asideTag of asideTags; track asideTag) {
        <app-tag-article
          [tag]="asideTag"
        />
      }
    </aside>
    `,
  styles: [
    `
      aside {
        display: grid;
        grid-row-gap: 1rem;
      }
      :host {
        display: block;
      }
    `,
  ],
  imports: [TagArticleComponent],
})
export class RightbarContainerComponent {
  asideTags = HOME_TAGS;
}
