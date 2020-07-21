import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  constructor() { }

  @Input()
  public pageNumber: number;
  @Input()
  public pageSize: number;
  @Input()
  public count = 6;

  @Output()
  public prevBtnClicked: EventEmitter<number> = new EventEmitter();
  @Output()
  public nextBtnClicked: EventEmitter<number> = new EventEmitter();

  public totalPages: number;

  public ngOnInit(): void {
    this.totalPages = Math.ceil(this.count / this.pageSize);
  }

  public goToPrevPage(): void {
    if (this.pageNumber === 0) {
      return;
    }

    this.pageNumber--;

    this.prevBtnClicked.emit(this.pageNumber);
  }

  public goToNextPage(): void {
    if (this.pageNumber === this.totalPages) {
      return;
    }

    this.pageNumber++;

    this.nextBtnClicked.emit(this.pageNumber);
  }

}
