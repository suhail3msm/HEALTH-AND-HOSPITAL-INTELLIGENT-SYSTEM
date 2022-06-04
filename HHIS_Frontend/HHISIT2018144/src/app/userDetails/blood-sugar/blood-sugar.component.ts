import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-blood-sugar',
  templateUrl: './blood-sugar.component.html',
  styleUrls: ['./blood-sugar.component.scss']
})
export class BloodSugarComponent implements OnInit {

  constructor(public userService:UserService) { }

  supervisorName=localStorage.getItem('name');
  hospitalName=localStorage.getItem('hospitalName');
  nic=localStorage.getItem('nic');

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.bloodSugar.value.subervName=this.supervisorName;
    this.userService.bloodSugar.value.hospitalName=this.hospitalName;
    this.userService.bloodSugar.value.patientNic=this.nic;
    this.userService.insertBloodSugar(this.userService.bloodSugar.value).subscribe(res =>{
      console.log(res);
    })
  }

}
