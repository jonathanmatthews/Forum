import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryDto, CategoryClient } from 'src/app/generated/forum-api.service';
import { FiltersService } from '../../services/filters.service';
import { map, tap } from 'rxjs/operators';

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

  public categories$: Observable<CategoryDto[]>;
  public activeCategory: CategoryDto;

  public ngOnInit(): void {
    this.categories$ = this._categoryService.listCategories(null, null)
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
        })
      );
  }

  public getCategory(category: CategoryDto): void {
    this.activeCategory = category;
    this._filterService.updateCategory(category);
  }

}
