import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const server_addr = "http://localhost:8082";

@Injectable({
  providedIn: 'root'
})



export class DoctorService {

  
  constructor(private http:HttpClient) { }

  doctorForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    gender: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    phoneNo: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$'),Validators.maxLength(10)]),
    nic: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    joindDate: new FormControl('',Validators.required),
    hospitalId: new FormControl('',Validators.required),
    jobExpiance: new FormControl('',Validators.required),
    doctorSpecialty: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
  });

  initializeFormGroup() {
    this.doctorForm.setValue({
      id:0,
      name:"",
      gender:"",
      address:"",
      email:"",
      phoneNo:"",
      nic:"",
      dob:"",
      joindDate:"",
      hospitalId:localStorage.getItem('id'),
      jobExpiance:"",
      doctorSpecialty:"",
      username:localStorage.getItem('username')
    });
  }

   //insert Doctor details
   insert_Doctor(data:any){
    let url = server_addr + '/saveDoctorDetails';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.post(url,data,{headers, responseType: 'json' });
  }

  //Delete Doctor details
  deleteDoctorById(id:any){
    let url = server_addr + '/deleteDoctor/'+id;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.delete(url,{headers, responseType: 'json' });
  }

   //insert Doctor details
   updateDoctor(data:any){
    let url = server_addr + '/updateDoctor';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.put(url,data,{headers, responseType: 'json' });
  }

  //get Doctor details
  get_Doctor(){
    let username = localStorage.getItem("username");
    let url = server_addr + '/findDoctor/' + username;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

  populateForm(Doctor: any) {
    this.doctorForm.setValue(Doctor);
  }
}
