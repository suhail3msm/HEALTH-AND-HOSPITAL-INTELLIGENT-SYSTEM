import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.scss']
})
export class BloodPressureComponent implements OnInit {

  constructor(public userService:UserService) { }

  supervisorName=localStorage.getItem('name');
  hospitalName=localStorage.getItem('hospitalName');
  nic=localStorage.getItem('nic');

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.bloodPressure.value.subervName=this.supervisorName;
    this.userService.bloodPressure.value.hospitalName=this.hospitalName;
    this.userService.bloodPressure.value.patientNic=this.nic;
    this.userService.insertBloodPressure(this.userService.bloodPressure.value).subscribe(res =>{
      console.log(res);
    })
  }

}
