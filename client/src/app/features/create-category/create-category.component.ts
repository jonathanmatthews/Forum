import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { CategoryDto, CategoryClient } from 'src/app/generated/forum-api.service';
import { Router } from '@angular/router';
import { takeUntil, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  constructor(
    private _categoryService: CategoryClient,
    private _router: Router) { }

  ngOnInit(): void {
  }


  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.minLength(2),
    Validators.maxLength(50), Validators.required]),
    text: new FormControl('', [Validators.minLength(2),
    Validators.maxLength(400)])
  });

  public errorMessage = '';
  private _destroy$ = new Subject();

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public createCategory(): void {
    if (!this.formGroup.valid) {
      return;
    }

    const newCategory = {
      title: this.formGroup.controls.title.value,
      description: this.formGroup.controls.text.value
    } as CategoryDto;

    this._categoryService.createCategory(newCategory)
      .pipe(
        catchError((error: any) => {
          if (+error.status === 401) {
            this.errorMessage = 'You must be logged in to post a forum.';
          }
          return of();
        }),
        takeUntil(this._destroy$))
      .subscribe((category: CategoryDto) => {
        if (category) {
          this._router.navigate(['forum/create'])
        }
      });
  }
}
