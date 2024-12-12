import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_API } from '../../../../constants/api.constant';
import { ArticleDetails } from '../../../../models/articles';
import { Reaction, ReactionData } from '../../../../models/reaction-data';

@Injectable({
  providedIn: 'root',
})
export class ArticleDetailApiService {
  constructor(private http: HttpClient) {}

  getArticle(username: string, slug: string): Observable<ArticleDetails> {
    return this.http.get<ArticleDetails>(
      `${BASE_API}/articles/${username}/${slug}`
    );
  }

  getArticleReactions(id: number): Observable<Reaction[]> {
    return this.http
      .get<ReactionData>(`${BASE_API}/reactions?article_id=${id}`)
      .pipe(map((reaction) => reaction.article_reaction_counts));
  }
}
