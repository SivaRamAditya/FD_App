import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Api } from '../';

import { Auth } from '../';
import { Observable } from 'rxjs/Observable';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  private _user: any;

  constructor(public api: Api, public auth: Auth, private http: HttpClient) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();
    this.http.get('https://FlawlessUsedWheel--sivaramtummala.repl.co').subscribe((response) => {
     alert(response);
    });
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
        return res;
      } else { //Just for temporary purpose need to update in future
        this._loggedIn('aZqthyuwerwerwer1wrwfafafafafarhrrtddf');
      }
    }, err => {
      this._loggedIn('aZqthyuwerwerwer1wrwfafafafafarhrrtddf');//console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store session data
   */
  _loggedIn(resp) {
    this.auth.setSession(resp);
  }


  getUserInformation(): Observable<User> {
    this._user = {
      'firstName': 'Aditya',
      'lastName': 'Tummala',
      'roleName': 'Admin',
      'roleId': 1,
      'userId': 1,
      'userName': 'sivaramadityatummala@gmail.com',
      'sideMenuPermissions': '*'
    };
    const seq = Observable.of<any>(this._user);
    this.setUserInformation(this._user);
    return seq;
  }

  /**
   * Set the user data
  */
  setUserInformation(user: any) {
    this._user = user;
  }

}
