import { Component, OnInit } from '@angular/core';
import { AuthClient, UserDto } from 'src/app/generated/forum-api.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(private _authClient: AuthClient) { }

  public username = '';
  public loggedIn = false;
  public usernameInput = '';
  public passwordInput = '';

  ngOnInit(): void {
    this._authClient.getAccountInfo()
      .subscribe(this._loginSuccess, this._loginFail);
  }

  login(): void {
    this._authClient.login([this.usernameInput, this.passwordInput])
      .subscribe(this._loginSuccess, this._loginFail);
  }

  logout(): void {

  }

  createAccount(): void {

  }

  private _loginSuccess(user: UserDto): void {
    this.username = user.Username;
    this.loggedIn = true;
    this.passwordInput = '';
  }

  private _loginFail(error: any): void {
    this.username = 'Log In';
    this.loggedIn = false;
    this.passwordInput = '';
  }
}
