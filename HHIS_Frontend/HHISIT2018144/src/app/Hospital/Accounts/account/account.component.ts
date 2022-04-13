import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { HhisServiceService } from 'src/app/services/hhis-service.service';
declare let Email: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

 Users:any;

  constructor(public accountService:AccountService,public dialog: MatDialog,public snackBar: MatSnackBar,private docService:DoctorService,private staffService:HhisServiceService) { }

  ngOnInit(): void {
  }


  getUserName(role:any){
    if(role=="doctor"){
      this.docService.get_Doctor().subscribe(res=>{
        console.log(res);
        this.Users=res;
      })
    }else{
      this.staffService.get_staff().subscribe(res=>{
        console.log(res);
        this.Users=res;
      })
    }
  }

  onSubmit(){

    //B313784E97B9984BF96749D1E1B9807CDB2B

    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'suhail2msm@gmail.com',
      Password : 'B313784E97B9984BF96749D1E1B9807CDB2B',
      To : this.accountService.hhssLoginForm.value.username,
      From : `suhail2msm@gmail.com`,
      Subject : "HHSS Login Details",
      Body :`Hi User, <br/><b> Welcome HHSS </b> <br/> Username: ${this.accountService.hhssLoginForm.value.username} <br /> Password: ${this.accountService.hhssLoginForm.value.password} `
      }).then( (message: any) => {alert(message); } );

    console.log(this.accountService.hhssLoginForm.value);
    this.staffService.saveAccount(this.accountService.hhssLoginForm.value).subscribe(res=>{

    })
  }
 
}
