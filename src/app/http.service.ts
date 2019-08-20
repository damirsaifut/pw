import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ls } from './constants';

export type method = 'post' | 'get' | 'delete' | 'put';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = 'http://193.124.114.46:3001/';

  constructor(private _http: HttpClient) {}

  public request<T>(params: { url: string; method: method; body?: {} }) {
    const token = ls.token.get() || undefined;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const { url, method, body } = params;

    switch (method) {
      case 'post':
        return this._http.post<T>(this.apiUrl + url, body, { headers }).pipe(
          map(data => data),
          catchError((err, Observable) => {
            return throwError(err['error']);
          })
        );

      case 'put':
        return this._http.put<T>(this.apiUrl + url, body, { headers });

      case 'delete':
        return this._http.delete<T>(this.apiUrl + url, { headers });

      default:
        return this._http.get<T>(this.apiUrl + url, { headers }).pipe(
          map(data => data),
          catchError((err, Observable) => {
            return throwError(err['error']);
          })
        );
    }
  }
}
