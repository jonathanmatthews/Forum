import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forums-header',
  templateUrl: './forums-header.component.html',
  styleUrls: ['./forums-header.component.scss']
})
export class ForumsHeaderComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  public goToCreateForum(): void {
    this._router.navigate(['forum/create']);
  }

}
