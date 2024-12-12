import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from '../constants/api.constant';
import { UserDetails } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}

  getUser(username?: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(
      `${BASE_API}/users/by_username?url=${username}`
    );
  }
}
