import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForumClient, CommentDto } from 'src/app/generated/forum-api.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _forumClient: ForumClient) { }

  public comment = new FormControl('', [Validators.minLength(1),
  Validators.maxLength(4000), Validators.required]);

  public unauthorised = false;

  ngOnInit(): void {
  }

  public createComment(): void {
    const text = this.comment.value;
    this._route.params.subscribe(params => {
      const forumId = +params.id;
      this._forumClient.createComment(forumId, { text } as CommentDto)
        .pipe(
          catchError(error => {
            if (+error.status === 401) {
              this.unauthorised = true;
            }
            return null;
          })
        )
        .subscribe(val => {
          this.unauthorised = false;
          this.comment.reset();
        });
    });
  }
}
