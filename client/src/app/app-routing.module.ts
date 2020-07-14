import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ForumDetailsComponent } from './features/forum-details/forum-details.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
