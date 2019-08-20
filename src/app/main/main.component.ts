import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  constructor(private _userService: UserService) {}

  public navMenu = [
    {
      name: 'Transactions',
      path: 'transactions',
      icon: 'transactions'
    }
  ];

  public get userInfo() {
    if (this._userService.userInfo)
      return this._userService.userInfo.user_info_token;
  }

  public logout() {
    this._userService.logout();
  }

  ngOnInit() {
    this._userService.getUserInfo();
  }
}
