import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-allergies-form',
  templateUrl: './allergies-form.component.html',
  styleUrls: ['./allergies-form.component.scss']
})
export class AllergiesFormComponent implements OnInit {
  supervisorName=localStorage.getItem('name');
  hospitalName=localStorage.getItem('hospitalName');
  nic=localStorage.getItem('nic');
  role=localStorage.getItem('role');
  constructor(public userService:UserService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userService.allergies.value.subervName=this.supervisorName;
    this.userService.allergies.value.hospitalName=this.hospitalName;
    this.userService.allergies.value.patientNic=this.nic;
    this.userService.insertAllergies(this.userService.allergies.value).subscribe(res =>{
      console.log(res);
    })
  }

}
