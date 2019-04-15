import { Component, OnInit } from '@angular/core';
import {PostsListComponent} from '../posts-list/posts-list.component';
import { MatDialogRef,MatInput } from '@angular/material';
import { FormGroupDirective, NgForm, FormBuilder, FormControl, FormGroup, Validators, FormArray, RequiredValidator } from '@angular/forms';
import {Globals} from '../global';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  
      postsData:FormGroup;
      i=1;
      posts:Array<Posts>=new Array<Posts>();
      global:Globals=new Globals();
      

  constructor(private dialogRef: MatDialogRef<PostsListComponent>,
    private fb: FormBuilder,
    private router:Router,
    private postsService:PostsService) {
      this.postsData = this.fb.group({
        title: ['', Validators.required],
        desc: ['', Validators.required]
      });
     }

  ngOnInit() {
    this.postsService.getPosts().subscribe(posts=>this.posts = posts); //Get Original posts
  }

  //Add Post 
  addPost(form){
    let posts1 =new Posts;
    posts1.userId=10+this.i;
    posts1.id=100+this.i;
    this.i++;
    posts1.title=form.title;
    posts1.body=form.desc;
    this.posts.push(posts1);    //Add Post Object to Array of Posts 
    this.postsService.setPost(this.posts); //Add Posts to Observable
    this.dialogRef.close(this.posts); //Calling dialogRef.afterClosed method
  }

  //Closing the DIALOG
  closeDialog(): void {
    this.dialogRef.close();
  }

}
