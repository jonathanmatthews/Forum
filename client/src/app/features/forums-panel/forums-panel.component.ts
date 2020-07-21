import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-forums-panel',
  templateUrl: './forums-panel.component.html',
  styleUrls: ['./forums-panel.component.scss']
})
export class ForumsPanelComponent implements OnInit {

  constructor() { }

  @Output() clicked = new EventEmitter<void>();

  ngOnInit(): void {
  }

  click() {
    this.clicked.next();
  }

}
