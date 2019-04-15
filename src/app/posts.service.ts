import { Injectable } from '@angular/core';
import { Posts} from './posts';
import {Observable,Subject, BehaviorSubject} from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Comments } from './comments';
import {environment} from '../environments/environment';


const httpOptions= {
 headers:new HttpHeaders({'Content-Type':'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class PostsService {

   private postsurl=environment.apiUrl+'posts';
   private commentsurl=environment.apiUrl+'comments?postId';
  // posts:Posts[];
  private subject=new BehaviorSubject<Posts[]>([]);
  public posts$=this.subject.asObservable(); 


  constructor(private http:HttpClient) { }

  //Get Posts
  getPosts():Observable<Posts[]>{
    return this.http.get<Posts[]>(this.postsurl);
  }

  //Get Post by Id
  getPost(id:number):Observable<Posts>{
    const url1 = `${this.postsurl}/${id}`;
    return this.http.get<Posts>(url1);
  }

  //Get Comments by Post Id
  getComments(id:number):Observable<Comments[]>{
    const url2=`${this.commentsurl}=${id}`;
    return this.http.get<Comments[]>(url2);

  }

  //Set Posts[] in Observable Stream
  setPost(value:Posts[]){
          this.subject.next(value);
    }

  /* getPost():Observable<Posts[]>{
     return this.subject.asObservable();
   } */
}
