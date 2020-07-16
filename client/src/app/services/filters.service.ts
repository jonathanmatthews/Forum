import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { CategoryDto } from '../generated/forum-api.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  constructor() { }

  public selectedCategory$: Observable<CategoryDto>;
  public searchTerm$: Observable<string>;

  private _categorySubject = new Subject<CategoryDto>();
  private _searchTermSubject = new BehaviorSubject<string>('');

  public UpdateCategory(category: CategoryDto): void {
    this._categorySubject.next(category);
  }

  public UpdateSearchTerm(term: string): void {
    this._searchTermSubject.next(term);
  }

  private InitialiseObservables(): void {
    this.selectedCategory$ = this._categorySubject.asObservable();
    this.searchTerm$ = this._searchTermSubject.asObservable();
  }
}
