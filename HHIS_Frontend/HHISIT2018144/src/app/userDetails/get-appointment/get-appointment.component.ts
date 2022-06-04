import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-get-appointment',
  templateUrl: './get-appointment.component.html',
  styleUrls: ['./get-appointment.component.scss']
})
export class GetAppointmentComponent implements OnInit {

  constructor(public appointmentService:AppointmentService) { }
  currentDate:any = new Date();

  ngOnInit(): void {
  }

  onSubmit(){
    this.appointmentService.saveAppointment(this.appointmentService.appointment.value).subscribe(data=>{
      console.log(data);
    })
  }

}
