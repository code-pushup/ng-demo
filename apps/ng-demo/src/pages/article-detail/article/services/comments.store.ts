import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CommentsApiService } from './comments-api.service';
import { Comment } from '../../../../models/comment';
import { tapResponse } from '@ngrx/operators';

interface CommentsState {
  comments: Comment[];
}

@Injectable({
  providedIn: 'root',
})
export class CommentsStore extends ComponentStore<CommentsState> {
  readonly comments$ = this.select((state) => state.comments);
  readonly setComments = this.updater(
    (state: CommentsState, comments: Comment[]) => ({
      ...state,
      comments,
    })
  );

  readonly getComments = this.effect((id: Observable<number>) =>
    id.pipe(
      switchMap((id) =>
        this.commetsApiS.getComments(id).pipe(
          tapResponse(
            (comments) => this.setComments(comments),
            (error) => console.error(error)
          )
        )
      )
    )
  );

  constructor(private commetsApiS: CommentsApiService) {
    super({ comments: [] });
  }
}
