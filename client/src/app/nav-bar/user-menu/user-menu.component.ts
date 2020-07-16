import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthClient, UserDto } from 'src/app/generated/forum-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable, of} from 'rxjs';
import { takeUntil, catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {

  constructor(private _authClient: AuthClient) { }

  public user: UserDto;
  public formTitle = 'Log in';
  public errorMessage = '';
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
    this._authClient.getAccountInfo()
      .pipe(
        catchError(error => {
          if (+error.status === 401) {
            return of();
          }
        }),
        takeUntil(this._destroy$))
        .subscribe(user => {
          if (user) {
            this.user = user;
          }
        });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public login(): void {
    this._authClient.login([this.usernameInput, this.passwordInput])
      .pipe(
        tap((user: UserDto) => {
          if (user) {
            this.errorMessage = '';
          }
        }),
        catchError((error: any) => {
          this.errorMessage = 'The username or password is incorrect. Please try again.';
          return of();
        }),
        takeUntil(this._destroy$))
          .subscribe(user => {
            this.user = user;
            }
        );
    }

  public createAccount(): void {
    this._authClient.create([this.usernameInput, this.passwordInput])
      .pipe(
        tap((user: UserDto) => {
          if (user) {
            this.errorMessage = '';
          }
        }),
        catchError((error: any) => {
          this.errorMessage = 'An error has occured. Please try again.';
          return of();
        }),
        takeUntil(this._destroy$))
          .subscribe(user => {
            this.user = user;
        });
  }

  public logout(): void {
    this._authClient.logout()
      .pipe(
        catchError((error: any) => {
          this.errorMessage = 'An error has occured. Please try again.';
          return of();
        }),
        takeUntil(this._destroy$))
          .subscribe(() => {
            this.user = null;
        });
  }

  public toggleForm(): void {
    this.loginForm.reset();
    this.errorMessage = '';

    if (this.formTitle === 'Log in') {
      this.formTitle = 'Sign up';
      return;
    }

    this.formTitle = 'Log in';
  }
}
