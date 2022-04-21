import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StaffModel } from '../Hospital/staffDetails/staff-form/staff-form.component';

const server_addr = "http://localhost:8082";
@Injectable({
  providedIn: 'root'
})
export class HhisServiceService {

  staff: StaffModel = new StaffModel();
  constructor(private http:HttpClient) { }

  //Hospital Form
  hospitalForm: FormGroup = new FormGroup({
    id: new FormControl(null),
		hos_name: new FormControl('',Validators.required),
		specialtyHospitals: new FormControl('',Validators.required),
		address: new FormControl('',Validators.required),
		phoneNo: new FormControl('',Validators.required),
		email: new FormControl('',[Validators.required,Validators.email]),
		district: new FormControl('',Validators.required),
		city: new FormControl('',Validators.required),
		hospitalRagisterNo: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
   
  });
  //hhssLogin Form
  hhssLoginForm: FormGroup = new FormGroup({
    id: new FormControl(null),
		username: new FormControl('',Validators.required),
		password: new FormControl('',Validators.required),
    oldPassword: new FormControl('',Validators.required),
		role: new FormControl('',Validators.required),
		hospitalName: new FormControl('')
  });

  //hhssLoginForm
  setValueLoginForm(data:any){
    this.hhssLoginForm.setValue(data);
  }

  //get gethhssLoginFormByEmailId details
  gethhssLoginFormByEmailId(){
    let username = localStorage.getItem("username");
    let url = server_addr + '/getAccountByUsername/' + username;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

   //updateLoginDetails
   updatehhssLoginForm(data:any){
    let url = server_addr + '/updateLoginDetails';
    return this.http.put(url,{'id':data.id,'username':data.username,'password':data.password,'role':data.role,'hospitalName':data.hospitalName});

  }


  //Hospital 
  setValueHospitalForm(data:any){
    this.hospitalForm.setValue(data);
  }


   //save Hospital details
 saveHospital(data:any){
  let url = server_addr + '/saveHospitalDetails' ;
  return this.http.post(url,{'hos_name':data.hos_name,
  'email':data.email,
  'address':data.address,
  'phoneNo':data.phoneNo,
  'district':data.district,
  'city':data.city,
  'hospitalRagisterNo':data.hospitalRagisterNo,
  'specialtyHospitals':data.specialtyHospitals
});
}

  //get getHospitalByEmailId details
  getHospitalByEmailId(){
    let username = localStorage.getItem("username");
    let url = server_addr + '/getHospitalByEmailId/' + username;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }
  //updateHospitalDetails
  updateHospitalDetails(data:any){
    let url = server_addr + '/updateHospitalDetails' ;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.put(url,data,{headers, responseType: 'json' });

  }

    //Login 
    login_user(data:any){
      let url = server_addr + '/authenticate';
      return this.http.post(url,data);
    }

    //covid api
    get_cases(){
      let url = 'http://www.hpb.health.gov.lk/api/get-current-statistical';
      return this.http.get(url);
    }

    public welcome(){
      let token = localStorage.getItem('token');
      let tokenStr='Bearer '+token;
      const headers=new HttpHeaders().set("Authorization",tokenStr);
      let url = server_addr + '/welcom';
      return this.http.get(url,{headers, responseType: 'text' as 'json' });
    }

    is_logged_in(){
      return localStorage.getItem('logged_in') == '1'?true:false;
    }
    
    //get staff details
    get_staff(){
      let username = localStorage.getItem("username");
      let url = server_addr + '/findStaff/' + username;
      let token = localStorage.getItem('token');
      let tokenStr='Bearer '+token;
      const headers=new HttpHeaders().set("Authorization",tokenStr);
      return this.http.get(url,{headers, responseType: 'json' });
    }

   //save account details
 saveAccount(data:any){
  let url = server_addr + '/saveLoginDetails' ;
  return this.http.post(url,{'username':data.username,'password':data.password,'role':data.role,'hospitalName':data.hospitalName});
}

   //save login details
   saveLogin(username:any,password:any,role:any,hospitalName:any){
    let url = server_addr + '/saveLoginDetails' ;
    return this.http.post(url,{'username':username,'password':password,'role':role,'hospitalName':hospitalName});
  }

  //Delete account details
  deleteAccountById(id:any){
    let url = server_addr + '/deleteAccount/'+id;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.delete(url,{headers, responseType: 'json' });
  }

}
