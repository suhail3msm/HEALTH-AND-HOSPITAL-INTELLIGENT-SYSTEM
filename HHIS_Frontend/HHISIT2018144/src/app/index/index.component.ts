import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HhisServiceService } from '../services/hhis-service.service';
import { UserRegisterComponent } from './user-register/user-register.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  response:any;
  constructor(private fb:FormBuilder,private HHISservice:HhisServiceService,private router:Router,public dialog: MatDialog,public snackBar: MatSnackBar) { }

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
        localStorage.setItem('hospitalName',res.hospitalName);
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
openUser(){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%"
    const dialogRef = this.dialog.open(UserRegisterComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
      console.log(`Dialog result: ${result}`);
      
    });
}
}
