import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.scss']
})
export class ViewAppointmentComponent implements OnInit {

  Users:any;
  userName:any;
  role=localStorage.getItem('role');

  constructor(public appointmentService:AppointmentService,private docService:DoctorService) { }

  ngOnInit(): void {
    this.getDoctor();
  }

  onSubmit(){

    this.docService.getDoctorByEmail(this.appointmentService.appointment.value.doctorEmail).subscribe((res:any)=>{
      this.userName=res.name;
      this.appointmentService.appointment.value.doctorName=this.userName;
      this.appointmentService.appointment.value.status='accept';
      this.appointmentService.saveAppointment(this.appointmentService.appointment.value).subscribe(data=>{
        console.log(data);
      })
    })
   
  }
  Cancel(data:any){
    this.appointmentService.appointment.value.status='cancel';
      this.appointmentService.saveAppointment(data).subscribe(data=>{
        console.log(data);
      })
  }

  getDoctor(){
      this.docService.get_Doctor().subscribe(res=>{
        console.log(res);
        this.Users=res;
      })
  }

  getUserName(doctorEmail:any){
    console.log(doctorEmail);
    this.docService.getDoctorByEmail(doctorEmail).subscribe((res:any)=>{
      console.log(res);
      this.userName=res.name;
    })
  }

}
