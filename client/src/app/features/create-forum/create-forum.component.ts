import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss']
})
export class CreateForumComponent implements OnInit {

  constructor() { }

  public formGroup = new FormGroup({
    title: new FormControl('', [Validators.minLength(2),
      Validators.maxLength(100), Validators.required]),
    category: new FormControl('General'),
    text: new FormControl('', [Validators.minLength(2),
      Validators.maxLength(4000)])
  });

  ngOnInit(): void {
  }

  public createForum(): void {
    const values = this.formGroup.value;
    console.log(values);
  }

}
