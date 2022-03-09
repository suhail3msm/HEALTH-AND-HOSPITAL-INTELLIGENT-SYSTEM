import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-view-staff-details',
  templateUrl: './view-staff-details.component.html',
  styleUrls: ['./view-staff-details.component.scss']
})
export class ViewStaffDetailsComponent implements OnInit {

  constructor(public service:StaffService) { }

  ngOnInit(): void {
  }

}
