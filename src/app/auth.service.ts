import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();
  
  constructor(private router:Router) { }

  //For Login and Logout Buttons on Header
  setLoggedIn(logg:boolean)
  {
    this.loggedIn.next(logg);
  }

  //For geting Username
  getUser(){
    return localStorage.getItem("user");
  }

  //For Login Page
  login(){
     this.router.navigate(['login']);
  }

  //For Logout
  logOut(){
    localStorage.removeItem("user");
    this.router.navigate(['']);
  }
}
