import { Component, OnInit } from '@angular/core';

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
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor() { }

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
  ];

  private readonly _forumId: number;

  ngOnInit(): void {
  }

}
