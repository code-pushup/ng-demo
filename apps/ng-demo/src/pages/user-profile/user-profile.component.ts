import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStore } from '../../state/user.store';
import { UserArticlesStore } from '../../state/user-articles.store';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { UserHeaderComponent } from './user-header/user-header.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';

@Component({
  selector: 'app-user-profile',

  template: `
    <ng-container *ngIf="user$ | async as user">
      <app-user-header *ngIf="user" [user]="user"></app-user-header>
    </ng-container>

    <ng-container *ngFor="let article of articles$ | async">
      <app-article-card [article]="article"></app-article-card>
    </ng-container>
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
  imports: [NgIf, UserHeaderComponent, NgFor, ArticleCardComponent, AsyncPipe],
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
