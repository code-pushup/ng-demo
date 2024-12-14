import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from '../../../../constants/api.constant';
import { Comment } from '../../../../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsApiService {
  constructor(private readonly http: HttpClient) {}

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${BASE_API}/comments?a_id=${id}`);
  }
}
