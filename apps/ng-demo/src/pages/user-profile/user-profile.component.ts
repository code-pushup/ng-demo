import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserStore } from '../../state/user.store';
import { UserArticlesStore } from '../../state/user-articles.store';

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
    standalone: false
})
export class UserProfileComponent implements OnInit {
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
