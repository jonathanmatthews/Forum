import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// TODO: replace model with generated nswag version
export interface Forum {
  id: number;
  author: string;
  title: string;
  text: string;
  creationDate: Date;
}

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss']
})
export class ForumDetailsComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  // TODO: Use endpoints
  public forum: Forum = {
    id: 1,
    author: 'user',
    title: 'Forum title',
    text: `Nulla eu nulla sed ex aliquet fringilla sit amet aliquam tortor. Nulla id mauris erat.
      Etiam felis mauris, porttitor id pretium dignissim, porta sit amet lorem. Aenean ac facilisis lorem.
      Curabitur eu sollicitudin metus. Integer consectetur aliquet luctus. Proin eu hendrerit est, ut vehicula neque.
      Duis imperdiet iaculis tellus, nec finibus sem malesuada et.`,
    creationDate: new Date()
  };

  public ngOnInit(): void {
  }

  public goToCreateForum(): void {
    this._router.navigate(['forum/create']);
  }

}
