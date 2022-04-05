import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StaffModel } from '../Hospital/staffDetails/staff-form/staff-form.component';

const server_addr = "http://localhost:8082";
@Injectable({
  providedIn: 'root'
})
export class HhisServiceService {

  staff: StaffModel = new StaffModel();
  constructor(private http:HttpClient) { }

  


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
      let username = localStorage.getItem("hospitalName");
      let url = server_addr + '/findStaff/' + username;
      let token = localStorage.getItem('token');
      let tokenStr='Bearer '+token;
      const headers=new HttpHeaders().set("Authorization",tokenStr);
      return this.http.get(url,{headers, responseType: 'json' });
    }

   //save account details
 saveAccount(data:any){
  let url = server_addr + '/saveLoginDetails' ;
  return this.http.post(url,data);
}


}
