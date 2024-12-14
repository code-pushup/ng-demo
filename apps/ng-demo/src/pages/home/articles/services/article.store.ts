import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Article } from '../../../../models/articles';
import { tapResponse } from '@ngrx/operators';
import { ArticleApiService } from '../../../../services/article-api.service';

type ArticlesState = {
  articles: Article[];
  featured?: Article[];
}

@Injectable({
  providedIn: 'root',
})
export class ArticleStore extends ComponentStore<ArticlesState> {
  readonly articles$ = this.select((state) => state.articles);
  readonly featuredArticles$ = this.select((state) => state.featured);
  readonly setArticles = this.updater(
    (state: ArticlesState, articles: Article[]) => ({
        ...state,
        featured: articles.slice(0, 3),
        articles: articles.slice(3),
      })
  );
  readonly getArticles = this.effect(() =>
    this.articleApiS
      .getArticles({
        state: 'rising',
        tag: 'angular',
        top: 120,
        per_page: 15,
      })
      .pipe(
        tapResponse(
          (articles) => this.setArticles(articles),
          (error) => console.error(error)
        )
      )
  );
  constructor(private readonly articleApiS: ArticleApiService) {
    super({ articles: [] });
  }
}
