import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Comment } from '../../../../models/comment';

@Component({
    selector: 'app-comments',
    template: `
    <details
      #commentsSec
      (toggle)="cdRef.detectChanges()"
      *ngFor="let comment of comments"
      class="comments-wrapper"
      open=""
    >
      <summary
        class="flex"
        [class.closed]="!commentsSec.open"
        [style]="{
          position: commentsSec.open ? 'absolute' : 'relative',
          top: commentsSec.open ? '3rem' : 0
        }"
      >
        <span>
          <svg
            *ngIf="commentsSec.open"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="img"
            class="crayons-icon expanded"
          >
            <path
              d="M12 10.677L8 6.935 9 6l3 2.807L15 6l1 .935-4 3.742zm0 4.517L9 18l-1-.935 4-3.742 4 3.742-1 .934-3-2.805z"
            ></path>
          </svg>
          <div class="flex align-center" *ngIf="!commentsSec.open">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              role="img"
              class="crayons-icon collapsed"
            >
              <path
                d="M12 18l-4-3.771 1-.943 3 2.829 3-2.829 1 .943L12 18zm0-10.115l-3 2.829-1-.943L12 6l4 3.771-1 .942-3-2.828z"
              ></path>
            </svg>
            <div class="comment-username">{{ comment.user.name }}</div>
          </div>
        </span>
      </summary>
      <div class="flex comments-body">
        <div class="comment-avatar">
          <img
            [src]="comment.user.profile_image_90"
            [alt]="comment.user.username"
          />
        </div>
        <div class="comment-border">
          <div class="comment-header flex align-center">
            <div class="comment-username">{{ comment.user.name }}</div>
            <div>・ {{ comment.created_at | date : 'MMM d' }}</div>
          </div>
          <div
            class="comment-inner-text body-html"
            [innerHtml]="comment.body_html"
          ></div>
        </div>
      </div>
      <app-comments
        class="app-comments"
        [comments]="comment.children"
      ></app-comments>
    </details>
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
    standalone: false
})
export class CommentsComponent {
  @Input() comments: Comment[] = [];
  constructor(public cdRef: ChangeDetectorRef) {}
}
