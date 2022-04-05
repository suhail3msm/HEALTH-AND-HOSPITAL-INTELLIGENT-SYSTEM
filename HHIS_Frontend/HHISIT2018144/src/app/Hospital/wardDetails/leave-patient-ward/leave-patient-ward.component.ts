import { Component, OnInit } from '@angular/core';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-leave-patient-ward',
  templateUrl: './leave-patient-ward.component.html',
  styleUrls: ['./leave-patient-ward.component.scss']
})
export class LeavePatientWardComponent implements OnInit {

  constructor(public service:WardService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.service.insert_wardSectionPatient(this.service.patientWardSectionForm.value).subscribe(res=>{
      console.log(res);
    })
  }
}
