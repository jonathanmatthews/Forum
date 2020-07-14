import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor() { }

  // TODO: Get user's name from API
  public username = 'Username';

  ngOnInit(): void {
  }

}
