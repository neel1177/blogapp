import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Posts } from '../posts';
import {switchMap} from 'rxjs/operators';
import { PostsService } from '../posts.service';
import {Comments} from '../comments';



@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})


export class PostDetailsComponent implements OnInit {

  posts:Posts[];
  posts1:Posts=new Posts();
  check:Boolean=true;
  comments:Array<Comments>=new Array<Comments>();
  selectedId:number;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private postsService:PostsService,)
     { }

  ngOnInit() {

     this.route.params.subscribe(params=>    //Get Id parameter from url
      {
        this.selectedId=params['id'];
      });
  
      this.postsService.getPost(this.selectedId).subscribe(posts=>this.posts1 = posts); //Fetching Post details for Selected Id
      this.postsService.getComments(this.selectedId).subscribe(comments=>this.comments=comments); //Fetching Comments for Selected PostId
       
      if (localStorage.getItem("user")=== null)  //For Hide/Show Comment 
      {
        this.check=false;
      }
  }

  //Add Comment
  addComment(comm:string)
  {
     let comments1 =new Comments;
      comments1.postId=this.selectedId;
      comments1.id=501;
      comments1.body=comm;
      comments1.email="xyz@info.com";
      comments1.name="ABC";
      this.comments.push(comments1);
   }

}
