import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  constructor( private http: HttpClient) { }

  login(email: string, password: string) {

    return this.http.post('/api/login', {email, password})
      .map( (res) => res )
      .catch( (error: any) => {
        return Observable.throw( error.toString() || ': Server Error');
      });
  }

  signup(email, password, username) {
    return this.http.post('/api/signup', { email, password, username})
      .map( (res) => res)
      .catch( (error: any) => {
        return Observable.throw( error.toString() || ':server error');
      });
  }

  // Get user information if logged in
  getUser() {
    return this.http.get('/api/user')
      .map( (res) => res)
      .catch( (error: any) => {
        return Observable.throw( error.toString() || ' :server error');
    });
  }

  logout() {
    return this.http.get('/api/logout')
      .map( (res) => res)
      .catch( (error: any) => {
        return Observable.throw( error.toString() || ':server error');
      });
  }
}
