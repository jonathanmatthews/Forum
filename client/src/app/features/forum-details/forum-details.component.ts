import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumClient, ForumDto } from 'src/app/generated/forum-api.service';

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss']
})
export class ForumDetailsComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _forumClient: ForumClient
  ) { }

  public forum: ForumDto;

  public ngOnInit(): void {
    this._route.params.subscribe(params => {
      const forumId = params.id;
      this._forumClient.getForum(forumId)
        .subscribe(val => {
          this.forum = val;
        });
    });
  }

  public goToCreateForum(): void {
    this._router.navigate(['forum/create']);
  }

}
