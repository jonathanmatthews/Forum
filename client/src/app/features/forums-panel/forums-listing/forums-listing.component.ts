import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject, combineLatest, of } from 'rxjs';
import { ForumDto, CategoryClient, ForumClient } from 'src/app/generated/forum-api.service';
import { FiltersService } from 'src/app/services/filters.service';
import { takeUntil } from 'rxjs/operators';

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
  public forumsCount$: Observable<number>;
  public pageNumber = 0;
  public pageSize = 5;

  private _pageNumberSubject = new BehaviorSubject<number>(0);
  private _destroy$ = new Subject();

  public ngOnInit(): void {
    this.loadForums();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goToForum(forum: ForumDto): void {
    this._router.navigate(['/forums', forum.id]);
  }

  public getPrevPage(prevPage: number): void {
    this.pageNumber = prevPage;
    this._pageNumberSubject.next(prevPage);
  }

  public getNextPage(nextPage: number): void {
    this.pageNumber = nextPage;
    this._pageNumberSubject.next(nextPage);
  }

  private loadForums(): void {
    combineLatest(
      [this._filtersService.selectedCategory$,
      this._pageNumberSubject.asObservable()])
        .pipe(takeUntil(this._destroy$))
        .subscribe(([category, pageNumber]) => {
          if (category.title === 'All') {
            this.forums$ = this._forumService.all(this.pageSize, pageNumber);
            this.forumsCount$ = this._forumService.countAll();
            return;
          }

          this.forums$ = this._categoryService.listForums(category.id, this.pageSize, pageNumber);
        });

    combineLatest(
      [this._filtersService.searchTerm$,
      this._pageNumberSubject.asObservable()])
      .pipe(
        takeUntil(this._destroy$))
      .subscribe(([searchTerm, pageNumber]) => {
        if (!searchTerm) {
          return;
        }

        this.forums$ = this._forumService.search(searchTerm, this.pageSize, pageNumber);
      });
    }
}
