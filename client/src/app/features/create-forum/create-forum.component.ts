import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryClient, CategoryDto, ForumDto } from 'src/app/generated/forum-api.service';
import { Observable } from 'rxjs';
import { Forum } from '../forum-details/forum-details.component';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss']
})
export class CreateForumComponent implements OnInit {

  constructor(private _categoryService: CategoryClient) { }

  public categories$: Observable<CategoryDto[]>;

  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.minLength(2),
      Validators.maxLength(100), Validators.required]),
    category: new FormControl(''),
    text: new FormControl('', [Validators.minLength(2),
      Validators.maxLength(4000)])
  });

  public ngOnInit(): void {
    this.categories$ = this._categoryService.listCategories(10, 0);
  }

  public createForum(): void {
    if (!this.formGroup.valid) {
      return;
    }

    const title = this.formGroup.controls.title.value as string;
    const category = this.formGroup.controls.category.value as CategoryDto;
    const text = this.formGroup.controls.text.value as string;

    console.log(title);
    console.log(category.id);
    console.log(text);

    const newForum = {
      title: title,
      text: text
    } as ForumDto;

    console.log(newForum);

    //this._categoryService.createForum(category.id, newForum);
  }

}
