import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent implements OnInit {

  

  constructor(public service:DoctorService) { }
  
  ngOnInit(): void {

  }
  onSubmit():void{
    if(this.service.doctorForm.value.id > 0){
      this.service.updateDoctor(this.service.doctorForm.value).subscribe(res=>{
        console.log(res);
      });
    }else{
      this.service.insert_Doctor(this.service.doctorForm.value).subscribe(res=>{
        console.log(res);
      });
    }
  
  }

}
