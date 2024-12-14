import { Component, Input, OnInit } from '@angular/core';
import { ArticleTagsStore } from '../services/article-tags.store';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-article',

  template: `
    <section>
      <header class="flex align-center">
        <h3>#{{ tag }}</h3>
      </header>
    
      @if (article$ | async; as articles) {
        <div>
          @for (article of articles; track article) {
            <a
              class="listing-item"
              routerLink="/{{ article.user.username }}/{{ article.slug }}"
              >
              <div>{{ article.title }}</div>
              <div class="listing-type">{{ article.comments_count }} comments</div>
            </a>
          }
        </div>
      }
      <ng-template #suspense>loading</ng-template>
      <ng-template #error>loading</ng-template>
    </section>
    `,
  styles: [
    `
      header {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #fbfcff;
        h3 {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .see-all-link {
          font-weight: 500;
          font-size: 0.875rem;
          color: #3b49df;
        }
      }

      .listing-item {
        display: block;
        padding: 1rem;
        border-bottom: 1px solid #fbfcff;
        color: #202428;
      }

      .listing-type {
        color: #64707d;
        font-size: 0.875rem;
        padding-top: 0.25rem;
      }

      .create-listing {
        font-weight: 500;
        padding: 0.75rem;
        font-size: 0.875rem;
        text-align: center;
        color: #202428;
        display: block;
      }

      :host {
        background-color: #f0eaff;
        color: #202428;
        box-shadow: 0 0 0 1px rgba(8, 9, 10, 0.05);
        display: block;
        border-radius: 5px;
      }
    `,
  ],
  viewProviders: [ArticleTagsStore],
  imports: [RouterLink, AsyncPipe],
})
export class TagArticleComponent implements OnInit {
  @Input() tag = '';
  article$ = this.articleStore.articles$;

  constructor(private readonly articleStore: ArticleTagsStore) {}

  ngOnInit(): void {
    this.articleStore.getArticles({ tag: this.tag, per_page: 6 });
  }
}
