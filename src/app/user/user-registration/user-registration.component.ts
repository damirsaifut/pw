import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Constants, ls } from 'src/app/constants';
import { MustMatch } from 'src/app/_helpers/must-match';
import { IToken } from 'src/app/model/user';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  public regForm: FormGroup;

  public get email() {
    return this.regForm.get('email');
  }

  public get username() {
    return this.regForm.get('username');
  }

  public get password() {
    return this.regForm.get('password');
  }

  public get confrimPassword() {
    return this.regForm.get('confrimPassword');
  }

  ngOnInit() {
    this.regForm = this._formBuilder.group(
      {
        username: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern(Constants.emailPattern)]
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confrimPassword: ['', Validators.required]
      },
      {
        validator: MustMatch('password', 'confrimPassword')
      }
    );
  }

  public onSubmit(e: Event) {
    e.preventDefault();
    this._userService
      .createUsers('users', 'post', {
        username: this.username.value,
        password: this.password.value,
        email: this.email.value
      })
      .subscribe(res => {
        ls.token.set(res.id_token);
        this._router.navigate(['/']);
      });
  }
}
