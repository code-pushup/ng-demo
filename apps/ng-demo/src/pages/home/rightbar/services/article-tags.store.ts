import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Article } from '../../../../models/articles';
import { tapResponse } from '@ngrx/operators';
import { ArticleApiService } from '../../../../services/article-api.service';

interface ArticlesState {
  articles: Article[];
}

@Injectable({
  providedIn: 'root',
})
export class ArticleTagsStore extends ComponentStore<ArticlesState> {
  readonly articles$ = this.select((state) => state.articles);

  readonly setArticles = this.updater(
    (state: ArticlesState, articles: Article[]) => ({
      ...state,
      articles: articles,
    })
  );

  readonly getArticles = this.effect(
    (params: Observable<Record<string, string | number | boolean>>) =>
      params.pipe(
        switchMap((params) =>
          this.articleApiS
            .getArticles({ ...params, state: 'fresh', top: 5 })
            .pipe(
              tapResponse(
                (articles) => this.setArticles(articles),
                (error) => console.error(error)
              )
            )
        )
      )
  );

  constructor(private articleApiS: ArticleApiService) {
    super({ articles: [] });
  }
}
