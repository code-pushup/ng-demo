import { Component } from '@angular/core';
import { ArticleStore } from '../services/article.store';

@Component({
    selector: 'app-article-container',
    template: `
    <app-article-header></app-article-header>
    <app-featured-article
      *ngFor="let article of featuredArticle | async"
      [featured]="article"
    ></app-featured-article>
    <ng-container *ngFor="let article of articles$ | async">
      <app-article-card [article]="article"></app-article-card>
    </ng-container>
  `,
    standalone: false
})
export class ArticleContainerComponent {
  articles$ = this.articleStore.articles$;
  featuredArticle = this.articleStore.featuredArticles$;

  constructor(private articleStore: ArticleStore) {}
}
