import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const server_addr = "http://localhost:8082";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  hhssLoginForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    role: new FormControl(''),
    hospitalName: new FormControl(null)
  });

  initializeFormGroup() {
    this.hhssLoginForm.setValue({
      id:"",
      username:"",
      password:"",
      role:"",
      hospitalName:localStorage.getItem('hospitalName')
  });
  }

 //get user details
 getUserDetails(){
  let hospitalName = localStorage.getItem("hospitalName");
  let url = server_addr + '/getAccountBy/' + hospitalName;
  let token = localStorage.getItem('token');
  let tokenStr='Bearer '+token;
  const headers=new HttpHeaders().set("Authorization",tokenStr);
  return this.http.get(url,{headers, responseType: 'json' });
}
}
