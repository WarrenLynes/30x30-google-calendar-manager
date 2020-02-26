import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authenticated, IUser, loading } from './auth.reducer';
import { Credentials } from '@calendar/core-data';
import { Store } from '@ngrx/store';
import { authenticate as authenticateAction, authenticateSuccess, logout } from './auth.actions';
import { AppState } from '../index';

@Injectable({providedIn: 'root'})
export class AuthFacade {
  get authenticated$(): Observable<boolean> {
    return this.store.select(authenticated);
  }

  get loading$(): Observable<boolean> {
    return this.store.select(loading);
  }

  constructor(private store: Store<AppState>) {}


  authenticate({access_token}) {
    this.store.dispatch(authenticateAction({access_token}));
  }

  authenticateSuccess(user) {
    this.store.dispatch((authenticateSuccess({user})))
  }


  logout() {
    this.store.dispatch(logout());
  }
}
