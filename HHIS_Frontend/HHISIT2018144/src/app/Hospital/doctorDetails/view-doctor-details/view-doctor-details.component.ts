import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-view-doctor-details',
  templateUrl: './view-doctor-details.component.html',
  styleUrls: ['./view-doctor-details.component.scss']
})
export class ViewDoctorDetailsComponent implements OnInit {

  constructor(public service:DoctorService) { }

  ngOnInit(): void {
  }

}
