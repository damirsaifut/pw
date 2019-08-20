import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/user/user.service';
import { ValidateBalance } from 'src/app/_helpers/validate-balance';
import { TransactionsService } from 'src/app/main/transactions/transactions.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.less']
})
export class CreateTransactionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateTransactionComponent>,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userService: UserService,
    private _transactionsService: TransactionsService,

    @Inject(MAT_DIALOG_DATA)
    public data: { username: string; amount: number }
  ) {}

  public form: FormGroup;

  public results;

  public get userInfo() {
    if (this._userService.userInfo)
      return this._userService.userInfo.user_info_token;
  }

  private get queryField() {
    return this.form.get('queryField');
  }

  private get amount() {
    return this.form.get('amount');
  }

  ngOnInit() {
    this.form = this._formBuilder.group(
      {
        queryField: [this.data.username || '', Validators.required],
        amount: [
          Math.abs(this.data.amount) || '',
          [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]
        ]
      },
      { validator: ValidateBalance('amount', this.userInfo.balance) }
    );

    this.form
      .get('queryField')
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(term => this.search(term))
      )
      .subscribe(res => (this.results = res));
  }

  public onCreate() {
    return this._transactionsService
      .createTransaction({
        name: this.queryField.value,
        amount: Number(this.amount.value)
      })
      .subscribe(
        res => {
          this._userService.getUserInfo();
          this._snackBar.open('Successfully', '', {
            duration: 2500,
            horizontalPosition: 'right',
            panelClass: ['blue-snackbar']
          });
        },
        err => {
          this._snackBar.open(err, '', {
            duration: 2500,
            horizontalPosition: 'right',
            panelClass: ['red-snackbar']
          });
        }
      );
  }

  private search(queryString: string) {
    return this._userService.searchUser(queryString);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
