import { Component, OnInit } from '@angular/core';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-patient-ward-details',
  templateUrl: './patient-ward-details.component.html',
  styleUrls: ['./patient-ward-details.component.scss']
})
export class PatientWardDetailsComponent implements OnInit {

  constructor(public service:WardService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.updatewardsection(this.service.wardSectionForm.value).subscribe(res=>{
      console.log(res);
    })
  }

}
