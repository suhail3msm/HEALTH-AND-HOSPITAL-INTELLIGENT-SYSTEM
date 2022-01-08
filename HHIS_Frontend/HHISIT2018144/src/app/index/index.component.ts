import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HhisServiceService } from '../hhis-service.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  response:any;
  constructor(private fb:FormBuilder,private HHISservice:HhisServiceService) { }

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
        this.accessApi(res.jwtToken);
        localStorage.clear();
        localStorage.setItem('id',res.id);
        localStorage.setItem('logged_in','1');
        localStorage.setItem('username',res.username);
        localStorage.setItem('token',res.jwtToken);
        localStorage.setItem('role',res.role);
        alert("Login successful")
        
    },(error:ErrorHandler)=>{
      console.log("Username or Password is Invalid..!");
      this.loginError = "Username or Password is Invalid..!";
    });
  }

  public accessApi(token:any){
    let resp=this.HHISservice.welcome(token);
    resp.subscribe(data=>this.response=data);
    console.log(this.response);
  }

covidCases(){
  this.HHISservice.get_cases().subscribe((res:any)=>{
    console.log(res.data.local_new_cases);
  })
}
}
