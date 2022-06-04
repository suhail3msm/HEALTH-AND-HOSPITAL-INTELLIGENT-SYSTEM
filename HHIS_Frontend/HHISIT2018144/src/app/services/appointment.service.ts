import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const server_addr = "http://localhost:8082";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  HospitalName:any;

  constructor(private http:HttpClient) { }

  appointment: FormGroup = new FormGroup({
    id: new FormControl(null),
    phoneNum: new FormControl('',Validators.required),
    injury: new FormControl('',Validators.required),
    appointmentDate: new FormControl('',Validators.required),
    appointmentTime: new FormControl('',Validators.required),
    status: new FormControl(''),
    patientNic: new FormControl('',Validators.required),
    patientName: new FormControl('',Validators.required),
    hospitalName: new FormControl(''),
    doctorName: new FormControl(''),
    doctorEmail: new FormControl('')
  })

  initializeAppointmentForm() {
    this.appointment.setValue({
      id: 0,
    phoneNum: '',
    injury: '',
    appointmentDate: '',
    appointmentTime: '',
    status: "pending",
    patientNic: localStorage.getItem('nic'),
    patientName: '',
    hospitalName: this.HospitalName,
    doctorName: '',
    doctorEmail: ''
    });
  }

  setDataAppointmentForm(data:any){
    this.appointment.setValue(data);
  }

  getHospitalName(name: any){
    this.HospitalName=name;
  }

   //save Appointment details
   saveAppointment(data:any){
    let url = server_addr + '/saveAppointment';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.post(url,data,{headers, responseType: 'json' });
  }

  //get Appointment details by NIC 
  getAppointment(){
    let nic = localStorage.getItem("hospitalName");
    let url = server_addr + '/getAppointment/' + nic;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

   //get Appointment details by Hospital 
   getAppointmentByHospital(){
    let hospitalName = localStorage.getItem("hospitalName");
    let url = server_addr + '/getAppointmentByHospital/' + hospitalName;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

   //get Appointment details by DoctorEmail
   getAppointmentByDoctorEmail(){
    let username = localStorage.getItem("username");
    let url = server_addr + '/getAppointmentByDoctor/' + username ;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

}
