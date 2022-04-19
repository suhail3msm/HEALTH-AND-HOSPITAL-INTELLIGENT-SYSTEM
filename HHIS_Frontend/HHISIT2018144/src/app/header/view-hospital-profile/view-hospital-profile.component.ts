import { Component, OnInit } from '@angular/core';
import { HhisServiceService } from 'src/app/services/hhis-service.service';

@Component({
  selector: 'app-view-hospital-profile',
  templateUrl: './view-hospital-profile.component.html',
  styleUrls: ['./view-hospital-profile.component.scss']
})
export class ViewHospitalProfileComponent implements OnInit {
  hide = true;
  role="hospital";
  data: any;
  isDisabled=true;
  constructor(public HHISservice:HhisServiceService) { }

  ngOnInit(): void {
  }

  onSubmit1(){

    this.HHISservice.updateHospitalDetails(this.HHISservice.hospitalForm.value).subscribe((res:any)=>{
      console.log(res);
      localStorage.removeItem('hospitalName');
      localStorage.setItem('hospitalName',res.hos_name);
    })

}

}
