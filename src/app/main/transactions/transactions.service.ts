import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import {
  IListTransactions,
  ICreateTransaction
} from 'src/app/model/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private _http: HttpService) {}

  public createTransaction(body: { name: string; amount: number }) {
    return this._http.request<ICreateTransaction>({
      url: 'api/protected/transactions',
      method: 'post',
      body: body
    });
  }

  public getListTransaction() {
    return this._http.request<IListTransactions>({
      url: 'api/protected/transactions',
      method: 'get'
    });
  }
}
