import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //check:Boolean=true;
  isLoggedIn: boolean;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {

    this.authService.loggedIn$.subscribe(x => {    //Getting Login Flag from Observable Stream
      this.isLoggedIn = x;
    });

    if (localStorage.getItem("user") !== null)   //If user already logged in
    {
      this.isLoggedIn = true;
    }
  }

  getUserName() {
    return this.authService.getUser();
  }

  loginHeader() {
    this.authService.login();
  }

  logOutHeader() {
    this.isLoggedIn = false;
    this.authService.logOut();
  }

}
