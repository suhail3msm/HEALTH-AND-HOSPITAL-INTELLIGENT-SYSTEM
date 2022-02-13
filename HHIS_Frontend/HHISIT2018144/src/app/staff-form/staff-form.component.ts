import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HhisServiceService } from '../services/hhis-service.service';


export class StaffModel{
id:any;  
name?:string;
gender?:string;
address?:string;
email?:string;
phoneNo?:string;
nic?:string;
dob?:string;
joindDate?:string;
hospitalId?:string;
jobExpiance?:string;
staffRole?:string;
username?:string;
}

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {

  dataStaff=this.hhisservice.staff;
 username=localStorage.getItem('username');
 hospitalId=localStorage.getItem('id');

  constructor(private hhisservice:HhisServiceService) { }
  
  ngOnInit(): void {
    console.log(this.hhisservice.staff);
  }
  onSubmit(form:NgForm):void{
    this.hhisservice.insert_staff(form.value).subscribe(res=>{
      console.log(res);
    })
  }
}
