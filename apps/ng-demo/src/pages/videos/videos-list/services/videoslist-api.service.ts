import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from '../../../../constants/api.constant';
import { VideosList } from '../../../../models/videosList';

@Injectable({
  providedIn: 'root',
})
export class VideoslistApiService {
  constructor(private readonly http: HttpClient) {}

  getVideoslist(params?: Record<string, string>): Observable<VideosList[]> {
    const newParams = new HttpParams({ fromObject: params }).toString();
    return this.http.get<VideosList[]>(`${BASE_API}/videos?${newParams}`);
  }
}
