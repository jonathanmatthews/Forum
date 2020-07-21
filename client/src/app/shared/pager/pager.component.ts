import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../page';


@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  constructor() { }

  @Input()
  public pageNumber = 1;
  @Input()
  public pageSize = 3;
  @Input()
  public count = 10;

  @Output()
  public prevBtnClicked: EventEmitter<Page> = new EventEmitter();
  @Output()
  public nextBtnClicked: EventEmitter<Page> = new EventEmitter();;

  public totalPages: number;

  public ngOnInit(): void {
    this.totalPages = Math.ceil(this.count / this.pageSize);
  }

  public goToPrevPage(): void {
    if (this.pageNumber === 0) {
      return;
    }

    this.pageNumber--;

    const prevPage = {
      pageNumber: this.pageNumber,
      pageSize: this.pageNumber
    } as Page;

    this.prevBtnClicked.emit(prevPage);
  }

  public goToNextPage(): void {
    if (this.pageNumber === this.totalPages) {
      return;
    }

    this.pageNumber++;

    const nextPage = {
      pageNumber: this.pageNumber,
      pageSize: this.pageNumber
    } as Page;

    this.nextBtnClicked.emit(nextPage);
  }

}
