import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidePanelComponent } from './features/side-panel/side-panel.component';
import { ForumsListingComponent } from './features/forums-listing/forums-listing.component';
import { SearchBarComponent } from './nav-bar/search-bar/search-bar.component';
import { UserMenuComponent } from './nav-bar/user-menu/user-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    SidePanelComponent,
    ForumsListingComponent,
    SearchBarComponent,
    UserMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
