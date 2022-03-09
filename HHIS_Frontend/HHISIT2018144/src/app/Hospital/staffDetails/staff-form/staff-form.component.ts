import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HhisServiceService } from '../../../services/hhis-service.service';
import { StaffService } from '../../../services/staff.service';


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

  constructor(private hhisservice:HhisServiceService, public service:StaffService) { }
  
  ngOnInit(): void {

  }
  onSubmit():void{
    if(this.service.form.value.id > 0){
      this.service.updateStaff(this.service.form.value).subscribe(res=>{
        console.log(res);
      });
    }else{
      this.service.insert_staff(this.service.form.value).subscribe(res=>{
        console.log(res);
      });
    }
  
  }
  
}
