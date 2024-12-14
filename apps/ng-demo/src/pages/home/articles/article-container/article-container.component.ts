import { Component } from '@angular/core';
import { ArticleStore } from '../services/article.store';
import { ArticleHeaderComponent } from '../article-header/article-header.component';
import { AsyncPipe } from '@angular/common';
import { FeaturedArticleComponent } from '../featured-article/featured-article.component';
import { ArticleCardComponent } from '../../../../components/article-card/article-card.component';

@Component({
  selector: 'app-article-container',

  template: `
    <app-article-header></app-article-header>
    @for (article of featuredArticle | async; track article) {
      <app-featured-article
        [featured]="article"
      ></app-featured-article>
    }
    @for (article of articles$ | async; track article) {
      <app-article-card [article]="article"></app-article-card>
    }
    `,
  imports: [
    ArticleHeaderComponent,
    FeaturedArticleComponent,
    ArticleCardComponent,
    AsyncPipe
],
})
export class ArticleContainerComponent {
  articles$ = this.articleStore.articles$;
  featuredArticle = this.articleStore.featuredArticles$;

  constructor(private articleStore: ArticleStore) {}
}
