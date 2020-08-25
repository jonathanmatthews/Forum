import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidePanelComponent } from './features/side-panel/side-panel.component';
import { ForumsListingComponent } from './features/forums-panel/forums-listing/forums-listing.component';
import { SearchBarComponent } from './nav-bar/search-bar/search-bar.component';
import { UserMenuComponent } from './nav-bar/user-menu/user-menu.component';
import { ForumsPanelComponent } from './features/forums-panel/forums-panel.component';
import { ForumsHeaderComponent } from './features/forums-panel/forums-header/forums-header.component';
import { ForumDetailsComponent } from './features/forum-details/forum-details.component';
import { CommentsComponent } from './features/forum-details/comments/comments.component';
import { CreateForumComponent } from './features/create-forum/create-forum.component';
import { AddCommentComponent } from './features/forum-details/comments/add-comment/add-comment.component';
import { CommentsListingComponent } from './features/forum-details/comments/comments-listing/comments-listing.component';
import { AuthClient, CategoryClient, ForumClient, API_BASE_URL } from './generated/forum-api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CreateCategoryComponent } from './features/create-category/create-category.component';
import { PagerComponent } from './shared/pager/pager.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SidePanelComponent,
    ForumsListingComponent,
    SearchBarComponent,
    UserMenuComponent,
    ForumsPanelComponent,
    ForumsHeaderComponent,
    ForumDetailsComponent,
    CommentsComponent,
    CreateForumComponent,
    AddCommentComponent,
    CommentsListingComponent,
    CreateCategoryComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    AuthClient,
    CategoryClient,
    ForumClient,
    { provide: API_BASE_URL, useValue: environment.apiRoot }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
