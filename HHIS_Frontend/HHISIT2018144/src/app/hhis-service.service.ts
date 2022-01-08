import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const server_addr = "http://localhost:8082";


@Injectable({
  providedIn: 'root'
})


export class HhisServiceService {


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

    public welcome(token:any) {
      let tokenStr = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', tokenStr);
      return this.http.get<string>("http://localhost:8082/welcom", {headers, responseType: 'text' as 'json' });
    }

    

}
