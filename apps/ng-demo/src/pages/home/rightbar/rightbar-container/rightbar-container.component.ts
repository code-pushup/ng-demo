import { Component } from '@angular/core';
import { HOME_TAGS } from '../../../../constants/home-tags.constant';
import { NgFor } from '@angular/common';
import { TagArticleComponent } from '../tag-article/tag-article.component';

@Component({
  selector: 'app-rightbar-container',

  template: `
    <aside>
      <app-tag-article
        *ngFor="let asideTag of asideTags"
        [tag]="asideTag"
      ></app-tag-article>
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
  imports: [NgFor, TagArticleComponent],
})
export class RightbarContainerComponent {
  asideTags = HOME_TAGS;
}
