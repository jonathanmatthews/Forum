import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface ChildComment {
  author: string;
  text: string;
  creationDate: Date;
}

export interface Comment {
  author: string;
  text: string;
  creationDate: Date;
  childComments: ChildComment[];
}

@Component({
  selector: 'app-comments-listing',
  templateUrl: './comments-listing.component.html',
  styleUrls: ['./comments-listing.component.scss']
})
export class CommentsListingComponent implements OnInit {

  constructor() { }

  public childComment = new FormControl('', [Validators.minLength(1),
    Validators.maxLength(4000), Validators.required]);

  // TODO: replace with api version
  public comments: Comment[] = [
    {
      author: 'user1',
      text: 'Some comment 1',
      creationDate: new Date(),
      childComments: [
        {
          author: 'user2',
          text: 'Some child comment 1',
          creationDate: new Date(),
        },
        {
          author: 'user5',
          text: 'Some child comment 3',
          creationDate: new Date(),
        }
      ]
    } as Comment,
    {
      author: 'user3',
      text: 'Some comment 2',
      creationDate: new Date(),
      childComments: [
        {
          author: 'user4',
          text: 'Some child comment 2',
          creationDate: new Date(),
        }
      ]
    } as Comment,
    {
      author: 'user7',
      text: 'Some comment 7',
      creationDate: new Date(),
      childComments: []
    } as Comment
  ];

  ngOnInit(): void {
  }

  public replyToComment(): void {
    // TODO: send api request

    const text = this.childComment.value;
    console.log(text);
  }

}
