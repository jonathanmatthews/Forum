import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { CategoryDto } from '../generated/forum-api.service';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() {
    this.initialiseObservables();
   }

  public selectedCategory$: Observable<CategoryDto>;
  public searchTerm$: Observable<string>;

  private _categorySubject = new Subject<CategoryDto>();
  private _searchTermSubject = new BehaviorSubject<string>('');

  public updateCategory(category: CategoryDto): void {
    this._categorySubject.next(category);
  }

  public updateSearchTerm(term: string): void {
    this._searchTermSubject.next(term);
  }

  private initialiseObservables(): void {
    this.selectedCategory$ = this._categorySubject.asObservable();
    this.searchTerm$ = this._searchTermSubject.asObservable()
      .pipe(
        switchMap((term) => of(term)),
        distinctUntilChanged()
      );
  }
}
