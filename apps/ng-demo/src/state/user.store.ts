import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { tapResponse } from '@ngrx/operators';
import { UserDetails } from '../models/user';
import { UserApiService } from '../services/user-api.service';

interface UserState {
  user: UserDetails | null;
}

@Injectable()
export class UserStore extends ComponentStore<UserState> {
  readonly user$ = this.select((state) => state.user);
  readonly setUser = this.updater((state: UserState, user: UserDetails) => ({
    ...state,
    user,
  }));
  readonly getUser = this.effect((username: Observable<string>) =>
    username.pipe(
      switchMap((username) =>
        this.userApiS.getUser(username).pipe(
          tapResponse(
            (user) => this.setUser(user),
            (error) => console.error(error)
          )
        )
      )
    )
  );

  constructor(private userApiS: UserApiService) {
    super({ user: null });
  }
}
