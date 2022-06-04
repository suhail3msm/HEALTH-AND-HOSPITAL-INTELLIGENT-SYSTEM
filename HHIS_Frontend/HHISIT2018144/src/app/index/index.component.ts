import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HhisServiceService } from '../services/hhis-service.service';
import { HospitalRegisterFormComponent } from './hospital-register-form/hospital-register-form.component';
import { UserRegisterComponent } from './user-register/user-register.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  response:any;
  totalUser: any;
  constructor(private fb:FormBuilder,public HHISservice:HhisServiceService,private router:Router,public dialog: MatDialog,public snackBar: MatSnackBar) { }

  loginForm =this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  })
  loginError ="";

  role:any;
  totalHospital:any;

  ngOnInit(): void {
    this.covidCases();
    this.getTotalHospital();
    this.getTotalUser();
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
    this.role= localStorage.getItem('role');
    if(this.role=="hospital" || this.role=="admin"){
    window.location.replace('/admin/das/dashboard');
    }else if(this.role=="doctor"){
      window.location.replace('/admin/das/prescription');
    }else if(this.role=="pharmacist"){
      window.location.replace('/admin/das/pharmacy');
    }else if(this.role=="nurse"){
      window.location.replace('/admin/das/ward');
    }else{
      window.location.replace('/UserDashboard');
    }
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

openHospital(){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%"
    const dialogRef = this.dialog.open(HospitalRegisterFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
      console.log(`Dialog result: ${result}`);
      
    });
}

// total hospital count
getTotalHospital(){
  this.HHISservice.getAllHospitalCount().subscribe(rep=>{
    this.totalHospital=rep;
  })
}

// total User count
getTotalUser(){
  this.HHISservice.getAllUserCount().subscribe(rep=>{
    this.totalUser=rep;
  })
}
}
