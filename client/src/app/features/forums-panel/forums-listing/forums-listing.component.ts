import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// TODO: this is temporary. Will be replaced with models generated by nswag
export interface ForumListingItem {
  id: number;
  title: string;
  body: string;
  timeCreated: Date;
}

@Component({
  selector: 'app-forums-listing',
  templateUrl: './forums-listing.component.html',
  styleUrls: ['./forums-listing.component.scss']
})
export class ForumsListingComponent implements OnInit {

  constructor(private _router: Router) { }

  // TODO: make into Observable once API is implemented
  public forums: ForumListingItem[] = [
    {
      id: 1,
      title: 'Forum title 1',
      body: 'Forum body 1',
      timeCreated: new Date()
    } as ForumListingItem,
    {
      id: 2,
      title: 'Forum title 2',
      body: 'Forum body 2',
      timeCreated: new Date()
    } as ForumListingItem,
    {
      id: 3,
      title: 'Forum title 3',
      body: 'Forum body 3',
      timeCreated: new Date()
    } as ForumListingItem,
    {
      id: 4,
      title: 'Forum title 4',
      body: 'Forum body 4',
      timeCreated: new Date()
    } as ForumListingItem,
    {
      id: 5,
      title: 'Forum title 5',
      body: 'Forum body 5',
      timeCreated: new Date()
    } as ForumListingItem
  ];

  public ngOnInit(): void {
  }

  public goToForum(forum: ForumListingItem): void {
    this._router.navigate(['/forums', forum.id]);
  }

}