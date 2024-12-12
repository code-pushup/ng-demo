import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TagsApiService } from './tags-api.service';
import { tapResponse } from '@ngrx/operators';
import { Tag } from '../../../../models/tags';

interface TagsState {
  tags: Tag[];
}

@Injectable({
  providedIn: 'root',
})
export class TagsStore extends ComponentStore<TagsState> {
  readonly tags$ = this.select((state) => state.tags);
  readonly getTags = this.effect(() =>
    this.tagsApiS.getTags().pipe(
      tapResponse(
        (tags) => {
          this.setTags(tags);
        },
        (error) => console.error(error)
      )
    )
  );

  readonly setTags = this.updater((state: TagsState, tags: Tag[]) => ({
    ...state,
    tags,
  }));

  constructor(private readonly tagsApiS: TagsApiService) {
    super({ tags: [] });
  }
}
