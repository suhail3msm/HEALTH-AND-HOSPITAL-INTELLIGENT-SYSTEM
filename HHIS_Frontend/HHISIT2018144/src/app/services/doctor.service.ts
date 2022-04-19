import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { exportUser } from '../classes/exportUser';

const server_addr = "http://localhost:8082";

@Injectable({
  providedIn: 'root'
})



export class DoctorService {

  
  constructor(private http:HttpClient) { }

  dataSet:any;

  get medicineControl(){
    return (<FormArray>this.medicineDescriptionForm.get('medicineName')).controls;
  }
  get medicineDecControl(){
    return (<FormArray>this.medicineDescriptionForm.get('medicineDec')).controls;
  }


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

  medicineDescriptionForm: FormGroup = new FormGroup({
    token: new FormControl(null),
    patientNic: new FormControl(''),
    patientName: new FormControl(''),
    numberOfDay: new FormControl('',Validators.required),
    age: new FormControl(''),
    doctorEmail: new FormControl(''),
    hospitalName: new FormControl(''),
    status: new FormControl(''),
    descrDate: new FormControl(''),
    descrYear: new FormControl(''),
    descrMonth: new FormControl(''),
    descrTime: new FormControl(''),
    medicineName: new FormArray([]),
    medicineDec: new FormArray([])
  });

  initializemedicineDescriptionForm() {
    this.medicineDescriptionForm.setValue({
      token:0,
      patientNic:"",
      patientName:"",
      numberOfDay:"",
      age:"",
      doctorEmail:localStorage.getItem('username'),
      hospitalName:localStorage.getItem('hospitalName'),
      status:"Pending",
      descrYear:'',
      descrMonth:'',
      descrTime:'',
      descrDate:'',
      medicineName:[],
      medicineDec:[]
    });
  }

onAddMedicine(){
  
  const control=new FormControl("",Validators.required);
  (<FormArray>this.medicineDescriptionForm.get('medicineName')).push(control);
  
}
onRemoveMedicine(index:any){
  (<FormArray>this.medicineDescriptionForm.get('medicineName')).removeAt(index);
  (<FormArray>this.medicineDescriptionForm.get('medicineDec')).removeAt(index);
}
onAddMedicineDec(){
  const control=new FormControl("",Validators.required);
  (<FormArray>this.medicineDescriptionForm.get('medicineDec')).push(control);
}
onaddform(){
  this.onAddMedicine();
  this.onAddMedicineDec();
}
//Delete medicineDescriptionForm details
deletemedicineDescriptionFormById(id:any){
  let url = server_addr + '/deletePatientMedicine/'+id;
  let token = localStorage.getItem('token');
  let tokenStr='Bearer '+token;
  const headers=new HttpHeaders().set("Authorization",tokenStr);
  return this.http.delete(url,{headers, responseType: 'json' });
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
    let hospitalName = localStorage.getItem("username");
    let url = server_addr + '/findDoctor/' + hospitalName;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

   //get Doctor details
   get_DoctorByEmail(){
    let email = localStorage.getItem("username");
    let url = server_addr + '/findDoctorByEmail/' + email;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

ViewDoctorDetails(data:any){
  this.dataSet=data;
}

  populateForm(Doctor: any) {
    this.doctorForm.setValue(Doctor);
  }

  populatePatientDescriptionForm(Doctor: any) {
    this.medicineDescriptionForm.setValue(Doctor);
  }

   //insert PatientMadicineTable details
   patientMadicineTable(data:any){
    let url = server_addr + '/savePatientMadicineTable';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.post(url,data,{headers, responseType: 'json' });
  }
}


