import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forums-header',
  templateUrl: './forums-header.component.html',
  styleUrls: ['./forums-header.component.scss']
})
export class ForumsHeaderComponent implements OnInit {

  constructor( ) { }

  @Output() clicked = new EventEmitter<void>();

  ngOnInit(): void {
  }

  click() {
    this.clicked.next();
  }

}
