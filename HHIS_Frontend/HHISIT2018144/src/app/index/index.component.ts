import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HhisServiceService } from '../services/hhis-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  response:any;
  constructor(private fb:FormBuilder,private HHISservice:HhisServiceService,private router:Router) { }

  loginForm =this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  })
  loginError ="";


  ngOnInit(): void {
    this.covidCases();
  }

  login(){
   this.HHISservice.login_user(this.loginForm.value).subscribe((res:any) =>{
        localStorage.clear();
        localStorage.setItem('id',res.id);
        localStorage.setItem('logged_in','1');
        localStorage.setItem('username',res.username);
        localStorage.setItem('token',res.jwtToken);
        localStorage.setItem('role',res.role);
        this.accessApi();
        
    },(error:ErrorHandler)=>{
      console.log("Username or Password is Invalid..!");
      this.loginError = "Username or Password is Invalid..!";
    });
  }

 accessApi(){
    let resp=this.HHISservice.welcome();
    resp.subscribe(data=>this.response=data);
    console.log(this.response);
    window.location.replace('/admin/das/dashboard');
  }

covidCases(){
  this.HHISservice.get_cases().subscribe((res:any)=>{
    console.log(res.data);
    this.response = res.data;
    
  })
}
}
