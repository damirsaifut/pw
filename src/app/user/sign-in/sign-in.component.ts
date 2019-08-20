import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Constants, ls } from 'src/app/constants';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  public authForm: FormGroup;

  get login() {
    return this.authForm.get('login');
  }

  get password() {
    return this.authForm.get('password');
  }

  ngOnInit() {
    this.authForm = this._formBuilder.group({
      login: [
        '',
        [Validators.required, Validators.pattern(Constants.emailPattern)]
      ],
      password: ['', Validators.required]
    });
  }
  ng;

  public onSubmit(e: Event) {
    e.preventDefault();
    this._userService
      .login('sessions/create', 'post', {
        email: this.login.value,
        password: this.password.value
      })
      .subscribe(
        res => {
          ls.token.set(res.id_token);
          this._router.navigate(['/']);
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
}
