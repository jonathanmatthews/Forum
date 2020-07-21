import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildCommentsPagingService {

  constructor() {
    this.initialiseObservables();
   }

  public pageNumber$: Observable<number>;
  public pageSize$: Observable<number>;
  public totalPages$: Observable<number>;

  private _pageNumberSubject = new BehaviorSubject<number>(0);
  private _pageSizeSubject = new Subject<number>();

  public updatePageNumber(newPageNumber: number): void {
    this._pageNumberSubject.next(newPageNumber);
  }

  public updatePageSize(newPageSize: number): void {
    this._pageSizeSubject.next(newPageSize);
  }

  private initialiseObservables(): void {
    this.pageNumber$ = this._pageNumberSubject.asObservable();
    this.pageSize$ = this._pageSizeSubject.asObservable();
  }
}
