import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.component.html',
  styleUrls: ['./view-my-profile.component.scss']
})
export class ViewMyProfileComponent implements OnInit {

  constructor(private doctorService:DoctorService,private staffService:StaffService) { }

  dataSet:any;
  username=localStorage.getItem("username");
  role=localStorage.getItem('role');
  doctorData:any;
  name:any;
  nic:any
  gender:any;
  address:any;
  phoneNo:any;
  dob:any;
  joindDate:any;
  jobExpiance:any;

  ngOnInit(): void {
     this.myProfile();
  }

  myProfile(){
    if(this.role=="pharmacist"){
      this.staffService.getStaffByEmail().subscribe((res:any)=>{
        console.log(res);
        this.dataSet=res;
      })
    }else if(this.role=="doctor" || this.role=="pharmacist"){
      this.doctorService.get_DoctorByEmail().subscribe((res:any)=>{
        console.log(res);
        this.dataSet=res;
      })
    }else{

    }
  }
}
