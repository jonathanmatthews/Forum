import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ForumDetailsComponent } from './features/forum-details/forum-details.component';
import { CreateForumComponent } from './features/create-forum/create-forum.component';
import { CreateCategoryComponent } from './features/create-category/create-category.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'forums'
  },
  {
    path: 'forums',
    component: HomeComponent,
  },
  {
    path: 'forums/:id',
    component: ForumDetailsComponent
  },
  {
    path: 'forum/create',
    component: CreateForumComponent
  },
  {
    path: 'category/create',
    component: CreateCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
