import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

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
  public count$: Observable<number>;
  @Input()
  public showCountInfo = false;

  @Output()
  public prevBtnClicked: EventEmitter<number> = new EventEmitter();
  @Output()
  public nextBtnClicked: EventEmitter<number> = new EventEmitter();

  public totalPages: number;
  public count: number;

  public ngOnInit(): void {
    this.count$.subscribe(count => {
      this.count = count;
      this.totalPages = Math.ceil(count / this.pageSize);
    });
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

  public getDisplayedCount(): string {
    let string: string;

    if (this.pageNumber + 1 === this.totalPages) {
      string = `${this.count}-${this.count}`;
      return string;
    }

    const lowerBound = (this.pageNumber * this.pageSize) + 1;
    const upperBound = (this.pageNumber + 1) * this.pageSize;

    string = `${lowerBound}-${upperBound}`;

    return string;
  }

}
