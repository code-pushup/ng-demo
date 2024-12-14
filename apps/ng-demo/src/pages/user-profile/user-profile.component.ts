import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStore } from '../../state/user.store';
import { UserArticlesStore } from '../../state/user-articles.store';
import { AsyncPipe } from '@angular/common';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';

@Component({
  selector: 'app-user-profile',

  template: `
    @if (user$ | async; as user) {
      @if (user) {
        <app-user-header [user]="user" />
      }
    }
    
    @for (article of articles$ | async; track article) {
      <app-article-card [article]="article" />
    }
    `,
  styles: [
    `
      app-article-card {
        margin-left: auto;
        margin-right: auto;
        max-width: 994px;
      }
    `,
  ],
  viewProviders: [UserStore, UserArticlesStore],
  imports: [UserHeaderComponent, ArticleCardComponent, AsyncPipe],
})
export default class UserProfileComponent implements OnInit {
  user$ = this.userStore.user$;
  articles$ = this.userArticles.articles$;
  constructor(
    private readonly userStore: UserStore,
    private readonly route: ActivatedRoute,
    private readonly userArticles: UserArticlesStore
  ) {}
  ngOnInit() {
    this.userStore.getUser(this.route.snapshot.params.username);
    this.userArticles.getArticles({
      username: this.route.snapshot.params.username,
    });
  }
}
