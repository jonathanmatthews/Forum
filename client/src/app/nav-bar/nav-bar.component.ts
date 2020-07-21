import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  public hideAddForumButton = false;

  public ngOnInit(): void {
  }

  public goToCreateForum(): void {
    this._router.navigate(['forum/create']);
  }

}
