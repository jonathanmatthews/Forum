import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CommentDto, ForumClient, ChildCommentDto } from 'src/app/generated/forum-api.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { ChildCommentsPagingService } from './child-comments-paging.service';

@Component({
  selector: 'app-comments-listing',
  templateUrl: './comments-listing.component.html',
  styleUrls: ['./comments-listing.component.scss']
})
export class CommentsListingComponent implements OnInit, OnDestroy {

  constructor(
    private _route: ActivatedRoute,
    private _forumClient: ForumClient,
    private _childCommentsPagingService: ChildCommentsPagingService) { }

  public childComment = new FormControl('', [Validators.minLength(1),
  Validators.maxLength(4000), Validators.required]);

  @Input()
  public commentsCount: number;

  public comments: CommentDto[] = [];
  public childComments: ChildCommentDto[] = [];
  public unauthorised = false;
  public visibleChildCommentsParentId = null;

  public pageNumber = 0;
  public pageSize = 5;
  public totalPages: number;

  public childCommentsPageNumber = 0;
  public childCommentsPageSize = 3;
  public childCommentsTotalPages: number;

  private _destroy$ = new Subject();

  ngOnInit(): void {
    this._childCommentsPagingService.updatePageSize(this.pageSize);
    this.totalPages = Math.ceil(this.commentsCount / this.pageSize);
    this._getComments();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public replyToComment(commentId: number): void {
    const text = this.childComment.value;
    this._forumClient.createChildComment(commentId, { text } as ChildCommentDto)
      .pipe(
        catchError(error => {
          if (+error.status === 401) {
            this.unauthorised = true;
          }
          return of();
        }),
        takeUntil(this._destroy$)
      )
      .subscribe(val => {
        this.unauthorised = false;
        this.childComment.reset();
        this._getComments();
      });
  }

  public toggleChildComments(commentId: number, childCommentsCount: number): void {
    if (this.visibleChildCommentsParentId === commentId) {
      this.visibleChildCommentsParentId = null;
      return;
    }

    this.visibleChildCommentsParentId = commentId;
    this.childCommentsPageNumber = 0;
    this.getChildComments(commentId, childCommentsCount);
  }

  public showMoreComments(): void {
    if (this.pageNumber + 1 === this.totalPages) {
      return;
    }

    this.pageNumber++;

    this._route.params.subscribe(params => {
      const forumId = +params.id;
      this._forumClient.listComments(forumId, this.pageSize, this.pageNumber)
        .pipe(takeUntil(this._destroy$))
        .subscribe(val => this.comments = this.comments.concat(val));
    });
  }

  public showLessComments(): void {
    this.pageNumber = 0;

    this.comments = this.comments.slice(0, this.pageSize);
  }

  public showMoreChildComments(): void {
    if (this.childCommentsPageNumber + 1 === this.childCommentsTotalPages) {
      return;
    }

    this.childCommentsPageNumber++;

    this._forumClient.listChildComments(this.visibleChildCommentsParentId,
      this.childCommentsPageSize, this.childCommentsPageNumber)
      .pipe(takeUntil(this._destroy$))
      .subscribe(val => {
        this.childComments = this.childComments.concat(val);
      });
  }

  public showLessChildComments(): void {
    this.childCommentsPageNumber = 0;

    this.childComments = this.childComments.slice(0, this.childCommentsPageSize);
  }

  private _getComments(): void {
    this._route.params.subscribe(params => {
      const forumId = +params.id;
      this._forumClient.listComments(forumId, this.pageSize, this.pageNumber)
        .pipe(takeUntil(this._destroy$))
        .subscribe(val => this.comments = val);
    });
  }

  private getChildComments(commentId: number, childCommentsCount: number) {
    this.childCommentsTotalPages = Math.ceil(childCommentsCount / this.childCommentsPageSize);

    this._forumClient.listChildComments(commentId, this.childCommentsPageSize,
      this.childCommentsPageNumber)
      .pipe(takeUntil(this._destroy$))
      .subscribe(val => {
        this.childComments = val;
      });
  }
}
