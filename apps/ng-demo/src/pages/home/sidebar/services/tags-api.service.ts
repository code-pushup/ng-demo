import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from '../../../../constants/api.constant';
import { Tag } from '../../../../models/tags';

@Injectable({
  providedIn: 'root',
})
export class TagsApiService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${BASE_API}/tags`);
  }
}
