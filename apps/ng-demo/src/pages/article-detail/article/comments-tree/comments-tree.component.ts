import { Component, Input } from '@angular/core';
import { CommentsStore } from '../services/comments.store';
import { AsyncPipe } from '@angular/common';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-comments-tree',

  template: `
    <header class="flex justify-between">
      <h2>
        Discussion <span>({{ commentsCount }})</span>
      </h2>
      <button class="subscribe-btn btn" type="button">Subscribe</button>
    </header>
    @if (comments$ | async; as comments) {
      <div class="comments">
        <app-comments [comments]="comments" />
      </div>
    }
    `,
  styles: [
    `
      :host {
        display: block;
        app-comments {
          padding-left: 1.75rem;
        }
      }
    `,
  ],
  imports: [CommentsComponent, AsyncPipe],
})
export class CommentsTreeComponent {
  @Input() commentsCount = 0;
  comments$ = this.commentStore.comments$;
  constructor(private readonly commentStore: CommentsStore) {}
}
