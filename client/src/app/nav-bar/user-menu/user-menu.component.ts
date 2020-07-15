import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthClient, UserDto } from 'src/app/generated/forum-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {

  constructor(private _authClient: AuthClient) { }

  public user$: Observable<UserDto>;
  public loggedIn = false;
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  public get usernameInput(): string {
    return this.loginForm.controls.username.value;
  }
  public get passwordInput(): string {
    return this.loginForm.controls.password.value;
  }

  private _destroy$ = new Subject();

  public ngOnInit(): void {
    // if (this.loggedIn) {
    //   this._authClient.getAccountInfo()
    //     .pipe(takeUntil(this._destroy$));
    // }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public login(): void {
    this.user$ = this._authClient.login([this.usernameInput, this.passwordInput])
      .pipe(takeUntil(this._destroy$));
  }

  public logout(): void {

  }

  public createAccount(): void {

  }
}
