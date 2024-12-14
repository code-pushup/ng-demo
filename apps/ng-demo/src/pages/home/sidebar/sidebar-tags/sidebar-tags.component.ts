import { Component, OnInit } from '@angular/core';
import { TagsStore } from '../services/tags.store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-tags',

  template: `
    <nav aria-label="Secondary sidebar nav">
      <header class="flex align-center justify-between">
        <h3 class="tags-title">My Tags</h3>
        <a
          href="/dashboard/following_tags"
          aria-label="Customize tag priority"
          title="Customize tag priority"
          >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#64707d">
            <path
              d="M12 1l9.5 5.5v11L12 23l-9.5-5.5v-11L12 1zm0 2.311L4.5 7.653v8.694l7.5 4.342 7.5-4.342V7.653L12 3.311zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
            ></path>
          </svg>
        </a>
      </header>
      @if (tags$ | async; as tags) {
        <div
          class="followed-tags"
          style="max-height: 42vh"
          >
          @for (tag of tags; track tag) {
            <div>
              <a title="{{ tag.name }} tag" href="/tag/{{ tag.name }}"
                >#{{ tag.name }}</a
                >
              </div>
            }
          </div>
        }
        <ng-template #suspense>loading</ng-template>
      </nav>
    `,
  styles: [
    `
      .tags-title {
        font-size: 16px;
        font-weight: 700;
        color: #202428;
      }

      header {
        padding: 0.5rem;
      }

      .followed-tags {
        height: 42vh;
        overflow-y: auto;
        a {
          display: block;
          padding: 0.5rem;
          color: #202428;
          border-radius: 5px;
          width: 100%;
          &:hover,
          &:active {
            background-color: rgba(8, 9, 10, 0.05);
            color: #e32fcf;
          }
        }
      }
    `,
  ],
  imports: [AsyncPipe],
})
export class SidebarTagsComponent {
  tags$ = this.tagsStore.tags$;
  constructor(private tagsStore: TagsStore) {}
}
