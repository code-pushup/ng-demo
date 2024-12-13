import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ArticleDetailStore } from './article/services/article-detail.store';
import { CommentsStore } from './article/services/comments.store';
import { UserStore } from '../../state/user.store';
import { UserArticlesStore } from '../../state/user-articles.store';
import { NgIf, AsyncPipe } from '@angular/common';
import { ReactionsComponent } from './article/reactions/reactions.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

@Component({
  selector: 'app-article-detail',

  template: `
    <aside>
      <app-reactions
        *ngIf="reaction$ | async as reactions"
        [reactions]="reactions"
      ></app-reactions>
    </aside>
    <ng-container *ngIf="article$ | async as article">
      <app-article-details
        *ngIf="article"
        [article]="article"
      ></app-article-details>
    </ng-container>
    <ng-container *ngIf="user$ | async as user">
      <app-user-detail *ngIf="user" [user]="user"></app-user-detail>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: grid;
        grid-gap: 1rem;
        /*
          minmax is used because of grid blowout because of the pre tag
          For details refer https://css-tricks.com/preventing-a-grid-blowout/
        */
        grid-template-columns: 4rem minmax(0, 7fr) minmax(0, 3fr);
      }
    `,
  ],
  viewProviders: [ArticleDetailStore, UserStore, CommentsStore],
  imports: [
    NgIf,
    ReactionsComponent,
    ArticleDetailsComponent,
    UserDetailComponent,
    AsyncPipe,
  ],
})
export default class ArticleDetailComponent implements OnInit {
  article$ = this.articleDetailStore.article$.pipe(
    tap((article) => {
      if (article?.user) {
        this.userStore.getUser(article.user.username);
        this.articleUserStore.getArticles({ username: article.user.username });
        this.articleDetailStore.getReactions(article.id);
        this.commentsStore.getComments(article.id);
      }
    })
  );
  reaction$ = this.articleDetailStore.reaction$;
  user$ = this.userStore.user$;
  constructor(
    private articleDetailStore: ArticleDetailStore,
    private route: ActivatedRoute,
    private userStore: UserStore,
    private articleUserStore: UserArticlesStore,
    private commentsStore: CommentsStore
  ) {}

  ngOnInit(): void {
    this.articleDetailStore.getArticle(this.route.params);
  }
}
