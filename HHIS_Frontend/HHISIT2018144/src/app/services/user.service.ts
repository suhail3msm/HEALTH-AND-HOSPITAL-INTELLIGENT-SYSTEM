import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const server_addr = "http://localhost:8082";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  userRegister: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    phoneNo: new FormControl('',Validators.required),
    district: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    nic: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    age: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
   
  });

     //save account details
 saveUser(data:any){
  let url = server_addr + '/saveUserDetails' ;
  return this.http.post(url,{'name':data.name,
  'email':data.email,
  'address':data.address,
  'phoneNo':data.phoneNo,
  'district':data.district,
  'city':data.city,
  'nic':data.nic,
  'dob':data.dob,
  'age':data.age
});
}

  // get user Details 
  getUserDetailsByNic(nic:any){
    let url = server_addr + '/getuserDetails/' + nic;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

  

}


