import { Injectable } from '@angular/core';
import { HttpService, method } from '../http.service';
import { ILogin, IToken, ICreateUser, IUserInfo } from '../model/user';
import { ls } from '../constants';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpService, private _router: Router) {}

  public userInfo: IUserInfo;

  public login(url: string, method: method, body: ILogin) {
    return this._http.request<IToken>({ url, method, body });
  }

  public createUsers(url: string, method: method, body: ICreateUser) {
    return this._http.request<IToken>({ url, method, body });
  }

  public logout(): void {
    ls.token.clear();
    this._router.navigate(['user/sign-in']);
  }

  public getUserInfo() {
    return this._http
      .request<IUserInfo>({
        url: 'api/protected/user-info',
        method: 'get'
      })
      .subscribe(res => (this.userInfo = res));
  }

  public searchUser(filter: string) {
    return this._http.request<IUserInfo>({
      url: 'api/protected/users/list',
      method: 'post',
      body: { filter: filter }
    });
  }

  public get isAuth() {
    return this._http
      .request({
        url: 'api/protected/user-info',
        method: 'get'
      })
      .pipe(
        map(res => true),
        catchError(err => {
          ls.token.clear();
          this._router.navigate(['user/sign-in']);
          return of(false);
        })
      );
  }
}
