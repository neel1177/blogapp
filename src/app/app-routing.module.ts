import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PostsListComponent} from './posts-list/posts-list.component';
import {PostDetailsComponent } from './post-details/post-details.component';
import {AuthGuard} from './auth.guard';
 
const routes: Routes = [
      {
        path:'',
        component:PostsListComponent
      },
      {
         path:'login',
        component:LoginComponent,
        canActivate:[AuthGuard]
      },
      {
          path:'posts-list',
         component:PostsListComponent
      }, 
      {
          path:'post-details/:id',
          component:PostDetailsComponent
      }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
