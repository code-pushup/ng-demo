import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from '../constants/api.constant';
import { Article } from '../models/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleApiService {
  constructor(private readonly http: HttpClient) {}

  getArticles(
    params?: Record<string, string | number | boolean>
  ): Observable<Article[]> {
    const newParams = new HttpParams({ fromObject: params }).toString();
    return this.http.get<Article[]>(`${BASE_API}/articles/latest?${newParams}`);
  }
}
