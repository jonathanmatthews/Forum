import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { CategoryDto, CategoryClient } from 'src/app/generated/forum-api.service';
import { FiltersService } from '../../services/filters.service';
import { map, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

  constructor(
    private _categoryService: CategoryClient,
    private _filterService: FiltersService
  ) { }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _destroy$ = new Subject();

  public categories$ = new BehaviorSubject<CategoryDto[]>([]);
  public activeCategory: CategoryDto;

  public pageNumber = 0;
  public pageSize = 5;
  public totalPages = 1;

  public ngOnInit(): void {
    this._categoryService.countCategories()
      .pipe(takeUntil(this._destroy$))
      .subscribe(val => this.totalPages = Math.ceil(val / this.pageSize));

    this._categoryService.listCategories(this.pageSize, this.pageNumber)
      .pipe(
        map((categories) => {
          const all = {
            id: null,
            title: 'All'
          } as CategoryDto;

          // Add 'All' option at the beginning
          return [all].concat(categories);
        }),
        tap((categories) => {
          this.activeCategory = categories[0];
          this._filterService.updateCategory(this.activeCategory);
        },
        takeUntil(this._destroy$)))
      .subscribe(val => this.categories$.next(val));
  }

  public getCategory(category: CategoryDto): void {
    this.activeCategory = category;
    this._filterService.updateCategory(category);
  }

  public showMoreCategories() {
    if (this.pageNumber + 1 === this.totalPages) {
      return
    }

    this.pageNumber++;
  
    this._categoryService.listCategories(this.pageSize, this.pageNumber)
      .pipe(takeUntil(this._destroy$))
      .subscribe(val => this.categories$.next(this.categories$.value.concat(val)));
  }

}
