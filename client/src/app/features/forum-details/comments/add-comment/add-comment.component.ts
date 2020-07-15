import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  constructor() { }

  public comment = new FormControl('', [Validators.minLength(1),
    Validators.maxLength(4000), Validators.required]);

  ngOnInit(): void {
  }

  public createComment(): void {
    const text = this.comment.value;
    console.log(text);

    // TODO: send request to api
  }

}
