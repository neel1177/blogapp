import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["../../assets/styles/bootstrap.scss", "./login.component.scss"]
})
export class LoginComponent implements OnInit{

  
  loginForm: FormGroup;
  isLoggedIn:boolean;
  

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private authService:AuthService) {
    this.loginForm = this.formBuilder.group({
    uname: ['', Validators.required],
    pass: ['',Validators.required],
  });
}

ngOnInit(){
  console.log("login");
}

login(form){
    if(form.uname === 'user1' && form.pass === 'user1')
     {
         localStorage.setItem("user",form.uname);
         this.isLoggedIn=true;
         this.authService.setLoggedIn(this.isLoggedIn);
         this.router.navigate(['posts-list']);
     }
      
  }

}
