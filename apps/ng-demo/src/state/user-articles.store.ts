import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { tapResponse } from '@ngrx/operators';
import { Article } from '../models/articles';
import { ArticleApiService } from '../services/article-api.service';

type ArticlesState = {
  articles: Article[];
}
@Injectable({
  providedIn: 'root',
})
export class UserArticlesStore extends ComponentStore<ArticlesState> {
  readonly articles$ = this.select((state) => state.articles);

  readonly setArticles = this.updater(
    (state: ArticlesState, articles: Article[]) => ({
        ...state,
        articles,
      })
  );

  readonly getArticles = this.effect(
    (params: Observable<Record<string, string | number | boolean>>) =>
      params.pipe(
        switchMap((params) =>
          this.articleApiS.getArticles({ username: params.username }).pipe(
            tapResponse(
              (articles) => this.setArticles(articles),
              (error) => console.error(error)
            )
          )
        )
      )
  );

  constructor(private readonly articleApiS: ArticleApiService) {
    super({ articles: [] });
  }
}
