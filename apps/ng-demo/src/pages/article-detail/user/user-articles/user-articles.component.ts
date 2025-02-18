import { Component, Input } from '@angular/core';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { ArticleDetailStore } from '../../article/services/article-detail.store';
import { UserArticlesStore } from '../../../../state/user-articles.store';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-articles',

  template: `
    @if (userArticles$ | async; as articles) {
      <section>
        <header class="flex align-center">
          <h3>
            More From <a>{{ name }}</a>
          </h3>
        </header>
        @for (article of articles; track article) {
          <a
            class="listing-item"
            routerLink="/{{ article.user.username }}/{{ article.slug }}"
            >
            <div class="title">{{ article.title }}</div>
            <div class="flex article-tags">
              @for (tag of article.tag_list; track tag) {
                <span class="article-tag">
                  #{{ tag }}
                </span>
              }
            </div>
          </a>
        }
        <ng-template #suspense>loading</ng-template>
        <ng-template #error>loading</ng-template>
      </section>
    }
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
        &:hover {
          background-color: #fff;
          .title {
            color: #e32fcf;
          }
        }
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

      .article-tag {
        font-size: 0.875rem;
        line-height: 1.3;
        border-radius: 5px;
        padding: 0.25rem;
        margin-right: 0.25rem;
        color: #64707d;
      }

      .article-tags {
        margin-left: -0.25rem;
        padding-top: 0.25rem;
        display: inline;
      }
    `,
  ],
  imports: [RouterLink, AsyncPipe],
})
export class UserArticlesComponent {
  @Input() name = '';
  userArticles$ = this.userArticleStore.articles$.pipe(
    withLatestFrom(this.articleDetailsStore.article$),
    map(([articles, articleDetails]) => {
      let index = 0;
      articles.find((article, idx) => {
        index = idx;
        return article.id === articleDetails?.id;
      });
      articles.splice(index, 1);
      return articles.slice(0, 3);
    })
  );
  constructor(
    private readonly userArticleStore: UserArticlesStore,
    private readonly articleDetailsStore: ArticleDetailStore
  ) {}
}
