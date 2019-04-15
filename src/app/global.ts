import { Injectable } from '@angular/core';
import {Posts} from './posts';
import {PostsService} from './posts.service';

@Injectable()
export class Globals  {

   public  globalPosts:Posts[];
   public hi:string="hello";
   // postsService:PostsService;
    // constructor(){}
     
     //  this.postsService.getPosts().subscribe(globalPosts=>this.globalPosts = globalPosts);
       //  console.log(this.globalPosts);

     
     public updatePosts(posts:Posts[]){
        this.globalPosts=posts;
        console.log('hi global');
        console.log(this.globalPosts);
    }

}