import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommentDto, ForumClient, ChildCommentDto } from 'src/app/generated/forum-api.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-comments-listing',
  templateUrl: './comments-listing.component.html',
  styleUrls: ['./comments-listing.component.scss']
})
export class CommentsListingComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _forumClient: ForumClient) { }

  public childComment = new FormControl('', [Validators.minLength(1),
  Validators.maxLength(4000), Validators.required]);

  public comments: CommentDto[] = [];
  public childComments: ChildCommentDto[] = [];
  public unauthorised = false;

  ngOnInit(): void {
    this._getComments();
  }

  public replyToComment(commentId: number): void {
    const text = this.childComment.value;
    this._forumClient.createChildComment(commentId, { text } as ChildCommentDto)
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
        this.childComment.reset();
        this._getComments();
      });
  }

  public getChildComments(commentId: number) {
    this._forumClient.listChildComments(commentId, null, null)
      .subscribe(val => {
        this.childComments = val;
      });
  }

  private _getComments(): void {
    this._route.params.subscribe(params => {
      const forumId = +params.id;
      this._forumClient.listComments(forumId, null, null)
        .subscribe(val => this.comments = val);
    });
  }
}
