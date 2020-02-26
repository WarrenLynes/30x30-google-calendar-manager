import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated = new BehaviorSubject(false);

  get authenticated() {
    return this._authenticated.asObservable();
  }

  constructor( private http: HttpClient ) {
    if(localStorage.getItem('TOKEN'))
      this._authenticated.next(true);
  }

  getToken() {
    return localStorage.getItem('TOKEN');
  }

  isAuthenticated() {
    return localStorage.getItem('TOKEN');
  }

  authenticate(tokens) {
    console.log(tokens);
   return this.http.get('/api/me', {
     headers: new HttpHeaders({
       'Authorization': `Bearer ${tokens.access_token}`
     })
   });
  }

  logout(): Observable<any> {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
    this._authenticated.next(false);
    return of('ok');
  }
}
