import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const server_addr = "http://localhost:8082";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http:HttpClient) { }

  form: FormGroup = new FormGroup({
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
    staffRole: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
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
      staffRole:"",
      username:localStorage.getItem('username')
    });
  }

   //insert staff details
   insert_staff(data:any){
    let url = server_addr + '/saveStaffDetails';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.post(url,data,{headers, responseType: 'json' });
  }

  //Delete staff details
  deleteStaffById(id:any){
    let url = server_addr + '/deleteStaff/'+id;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.delete(url,{headers, responseType: 'json' });
  }

   //insert staff details
   updateStaff(data:any){
    let url = server_addr + '/updateStaff';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.put(url,data,{headers, responseType: 'json' });
  }

  populateForm(staff: any) {
    this.form.setValue(staff);
  }

  //get Staff details
  getStaffByEmail(){
    let email = localStorage.getItem("username");
    let url = server_addr + '/findStaffTableByEmail/' + email;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

   
   getStaffDateBetween(fromDate:any,toDate:any){
    let email = localStorage.getItem("username");
    let url = server_addr + '/findStaff/'+ fromDate +'/'+ toDate;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }
}
