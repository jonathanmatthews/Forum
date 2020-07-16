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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CreateForumComponent } from './features/create-forum/create-forum.component';
import { AddCommentComponent } from './features/forum-details/comments/add-comment/add-comment.component';
import { CommentsListingComponent } from './features/forum-details/comments/comments-listing/comments-listing.component';
import { AuthClient, CategoryClient, ForumClient } from './generated/forum-api.service';

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
    CommentsListingComponent
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
    ForumClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
