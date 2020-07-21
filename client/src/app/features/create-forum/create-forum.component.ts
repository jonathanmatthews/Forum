import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryClient, CategoryDto, ForumDto } from 'src/app/generated/forum-api.service';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss']
})
export class CreateForumComponent implements OnInit, OnDestroy {

  constructor(
    private _categoryService: CategoryClient,
    private _router: Router) { }

  public categories$: Observable<CategoryDto[]>;
  public errorMessage = '';
  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.minLength(2),
      Validators.maxLength(100), Validators.required]),
    category: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.minLength(2),
      Validators.maxLength(4000)])
  });

  private _destroy$ = new Subject();

  public ngOnInit(): void {
    this.categories$ = this._categoryService.listCategories(10, 0);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createForum(): void {
    if (!this.formGroup.valid) {
      return;
    }

    const newForum = {
      title: this.formGroup.controls.title.value,
      text: this.formGroup.controls.text.value
    } as ForumDto;

    const categoryId = this.formGroup.controls.category.value;

    this._categoryService.createForum(categoryId, newForum)
      .pipe(
        catchError(error => {
          console.log(error);
          if (+error.status === 401) {
            this.errorMessage = 'You must be logged in to post a forum.';
          }
          return of();
        }),
        takeUntil(this._destroy$))
      .subscribe((forum: ForumDto) => {
        if (forum) {
          this._router.navigate(['forums/', forum.id]);
        }
      });
  }

}
