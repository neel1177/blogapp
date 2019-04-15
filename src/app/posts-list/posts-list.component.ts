import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostsService} from '../posts.service';
import {Posts} from '../posts';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogConfig, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {AddPostComponent} from '../add-post/add-post.component';
import {Globals} from '../global';
import { EventEmitter } from 'events';
import { Subject, Subscription } from 'rxjs';


@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  
  public p:number =1;
  posts:Posts[];
  check:Boolean=true;

  constructor(private router:Router,
    private postsService:PostsService,
    private dialog:MatDialog,
    private global:Globals ) { }


  ngOnInit() {
    this.postsService.getPosts().subscribe(posts=>this.posts = posts); //For Posts Listing
       if (localStorage.getItem("user")=== null)  //For Hide/Show Add Post
        {
           this.check=false;
        }
  }
  
  //Search Filter
  applyFilter(filterValue:string) 
  {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
  // this.posts=this.posts.filter(posts=>posts.title.includes(filterValue));  //Back Filtering Not works
    this.postsService.getPosts().subscribe(posts=>this.posts = posts.filter(posts=>posts.title.includes(filterValue)));
     //Filtering through Observanle stream
  } 

  //Add Post
  addPost():void
  {
     const dialogRef=this.dialog.open(AddPostComponent,{ //Opens Add Post Dialog
      disableClose: true,
      width: '70%',
      data: null,
      height: '50%'
     });

     dialogRef.afterClosed().subscribe(result=>{   // After Closing Dialog 
        this.postsService.posts$.subscribe(x=>    // RetrivingAdded Posts from Observable
       {  this.posts=x;});
       
       /*if(result!==null){ //Fetching data from dialog.close(this.posts);
        this.posts=result;
       }*/
        });
  }

  //View Post details
  viewPost(id:number)
  {
  this.router.navigate(['/post-details',id]);
  }

}
