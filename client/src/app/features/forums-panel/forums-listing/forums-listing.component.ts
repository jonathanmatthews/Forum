import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject, merge } from 'rxjs';
import { ForumDto, CategoryClient, ForumClient, CategoryDto } from 'src/app/generated/forum-api.service';
import { FiltersService } from 'src/app/services/filters.service';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-forums-listing',
  templateUrl: './forums-listing.component.html',
  styleUrls: ['./forums-listing.component.scss']
})
export class ForumsListingComponent implements OnInit, OnDestroy {

  constructor(
    private _categoryService: CategoryClient,
    private _forumService: ForumClient,
    private _filtersService: FiltersService,
    private _router: Router) { }

  public forums$: Observable<ForumDto[]>;
  public pageNumber = 1;
  public pageSize = 10;
  public forumsCount: number;

  private _destroy$ = new Subject();

  public ngOnInit(): void {
    this._filtersService.selectedCategory$
      .pipe(takeUntil(this._destroy$))
      .subscribe(category => {
        if (category.title === 'All') {
          this.forums$ = this._forumService.all(null, null);
          return;
        }

        this.forums$ = this._categoryService.listForums(category.id, null, null);
      });

    this._filtersService.searchTerm$
      .pipe(
        takeUntil(this._destroy$))
      .subscribe(searchTerm => {
        if (!searchTerm) {
          return;
        }

        this.forums$ = this._forumService.search(searchTerm, null, null);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goToForum(forum: ForumDto): void {
    this._router.navigate(['/forums', forum.id]);
  }

}
