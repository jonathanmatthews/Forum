import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public showCategories = new BehaviorSubject(false);

  ngOnInit(): void {
  }

  click() {
    this.showCategories.next(!this.showCategories.value)
  }

}
