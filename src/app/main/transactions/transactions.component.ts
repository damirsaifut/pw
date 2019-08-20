import { Component, OnInit } from '@angular/core';
import { MatDialog, PageEvent } from '@angular/material';
import { CreateTransactionComponent } from 'src/app/_modal/create-transaction/create-transaction.component';
import { TransactionsService } from './transactions.service';
import { Transaction } from 'src/app/model/transactions';
import * as moment from 'moment';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.less']
})
export class TransactionsComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _transactionsService: TransactionsService
  ) {}
  public results;
  public listTransaction: Transaction[] = [];
  public pageSize: number = 5;
  public currentPage: number = 0;
  public displayedColumns: string[] = [
    'id',
    'date',
    'username',
    'amount',
    'balance',
    'action'
  ];

  ngOnInit() {
    this.getListTransaction();
  }

  public setPage(event?: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  private getListTransaction() {
    return this._transactionsService.getListTransaction().subscribe(res => {
      this.listTransaction = this.sortDate(res.trans_token);
    });
  }

  private sortDate(arr: Transaction[]) {
    const newArr = arr.sort(
      (a, b) =>
        +moment(b.date, 'YYYY-M-DD hh:mm:ss') -
        +moment(a.date, 'YYYY-M-DD hh:mm:ss')
    );
    return newArr;
  }

  private onCreate(el?: { username: string; amount: number }) {
    const dialogRef = this._dialog.open(CreateTransactionComponent, {
      data: { ...el },
      disableClose: true,
      panelClass: 'modal',
      width: '520px'
    });

    dialogRef.beforeClosed().subscribe(res => {
      if (res) this.getListTransaction();
    });
  }
}
