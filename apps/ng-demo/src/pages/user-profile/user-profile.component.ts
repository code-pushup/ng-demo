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
        <app-user-header [user]="user"></app-user-header>
      }
    }
    
    @for (article of articles$ | async; track article) {
      <app-article-card [article]="article"></app-article-card>
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
    private userStore: UserStore,
    private route: ActivatedRoute,
    private userArticles: UserArticlesStore
  ) {}
  ngOnInit() {
    this.userStore.getUser(this.route.snapshot.params.username);
    this.userArticles.getArticles({
      username: this.route.snapshot.params.username,
    });
  }
}
