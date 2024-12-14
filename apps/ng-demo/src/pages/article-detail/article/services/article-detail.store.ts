import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArticleDetailApiService } from './article-detail-api.service';
import { ArticleDetails } from '../../../../models/articles';
import { Reaction } from '../../../../models/reaction-data';
import { tapResponse } from '@ngrx/operators';

type ArticleState = {
  article: ArticleDetails | null;
  reactions: Reaction[];
}
@Injectable()
export class ArticleDetailStore extends ComponentStore<ArticleState> {
  readonly article$ = this.select((state) => state.article);
  readonly reaction$ = this.select((state) => state.reactions);
  readonly setArticle = this.updater(
    (state: ArticleState, article: ArticleDetails) => ({
      ...state,
      article,
    })
  );

  readonly setReactions = this.updater(
    (state: ArticleState, reactions: Reaction[]) => ({
      ...state,
      reactions,
    })
  );
  readonly getArticle = this.effect((params: Observable<Params>) =>
    params.pipe(
      switchMap((params) =>
        this.articleDetailApiS.getArticle(params.user, params.slug).pipe(
          tapResponse(
            (article) => this.setArticle(article),
            (error) => console.error(error)
          )
        )
      )
    )
  );
  readonly getReactions = this.effect((id: Observable<number>) =>
    id.pipe(
      switchMap((id) =>
        this.articleDetailApiS.getArticleReactions(id).pipe(
          tapResponse(
            (reactions) => this.setReactions(reactions),
            (error) => console.error(error)
          )
        )
      )
    )
  );
  constructor(private readonly articleDetailApiS: ArticleDetailApiService) {
    super({ article: null, reactions: [] });
  }
}
