import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const server_addr = "http://localhost:8082";

@Injectable({
  providedIn: 'root'
})
export class WardService {

  wardIdSection:any;
  wardBed:any;
  wardId:any;
  wardSection:any;

  constructor(private http:HttpClient) { }

  wardSectionForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    section: new FormControl('',Validators.required),
    bedNumber: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    wardId: new FormControl('',Validators.required),
    patientName: new FormControl('',Validators.required),
    hospitalId: new FormControl('',Validators.required),
    patientNIC: new FormControl('',Validators.required),
    hospitalName: new FormControl('',Validators.required),
    admittedDate: new FormControl(null)
   
  });

  patientWardSectionForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    section: new FormControl('',Validators.required),
    bedNumber: new FormControl('',Validators.required),
    status: new FormControl('',Validators.required),
    wardId: new FormControl('',Validators.required),
    patientName: new FormControl('',Validators.required),
    patientNIC: new FormControl('',Validators.required),
    hospitalName: new FormControl('',Validators.required),
    hospitalId: new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    admittedDate: new FormControl(null),
    leavedDate: new FormControl(null),
   
  });

  wardForm: FormGroup = new FormGroup({
    id: new FormControl('',Validators.required),
    wardName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    numberOfPatient: new FormControl('',Validators.required),
    numberOfDeath: new FormControl('',Validators.required),
    hospitalId: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
  });

  initializewardSectionFormGroup() {
    this.wardSectionForm.setValue({
      id:0,
      section:"" ,
      bedNumber: "",
      status: "no",
      wardId: this.wardIdSection,
      admittedDate:"null", 
      patientName:"null", 
      hospitalId: localStorage.getItem('id'),
      patientNIC:"null",
      hospitalName:localStorage.getItem('username')
    
  });
  }

  updateInitializeWardSectionFormGroup() {
    this.wardSectionForm.setValue({
      id:this.wardId,
      section:this.wardSection,
      bedNumber: this.wardBed,
      status: "no",
      wardId: this.wardIdSection,
      admittedDate:"null", 
      patientName:"null", 
      hospitalId: localStorage.getItem('id'),
      patientNIC:"null",
      hospitalName:localStorage.getItem('username')
    
  });
  }

  initializeFormGroup() {
    this.wardForm.setValue({
      id:"",
      wardName:"",
      numberOfPatient:"",
      numberOfDeath:"",
      hospitalId:localStorage.getItem('id'),
      username:localStorage.getItem('username')
  });
  }
   //insert ward details
   insert_ward(data:any){
    let url = server_addr + '/saveWardDetails';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.post(url,data,{headers, responseType: 'json' });
  }

    //insert ward section details
    insert_wardSection(data:any){
      let url = server_addr + '/saveWardSectionDeatils';
      let token = localStorage.getItem('token');
      let tokenStr='Bearer '+token;
      const headers=new HttpHeaders().set("Authorization",tokenStr);
      return this.http.post(url,data,{headers, responseType: 'json' });
    }

  //update ward details
  updateward(data:any){
    let url = server_addr + '/updateWardDetails';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.put(url,data,{headers, responseType: 'json' });
  }

  //get ward details
  get_ward(){
    let username = localStorage.getItem("username");
    let url = server_addr + '/getWardDetails/' + username;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

    //get ward section details
    get_wardSection(data:any){
      let username = localStorage.getItem("username");
      let url = server_addr + '/getWardBy/' + data + '/' + username;
      let token = localStorage.getItem('token');
      let tokenStr='Bearer '+token;
      const headers=new HttpHeaders().set("Authorization",tokenStr);
      return this.http.get(url,{headers, responseType: 'json' });
    }

  populateForm(ward: any) {
    this.wardForm.setValue(ward);
  }
  populateWardSectionForm(wardSection: any) {
    this.wardSectionForm.setValue(wardSection);
  }
  populatePatientWardSection(patientWard: any){
    this.patientWardSectionForm.setValue(patientWard);
  }
  addWardId(id: any){
    this.wardIdSection=id;
    console.log(this.wardIdSection);
  }

  setWard(id:any,bednumber:any,section:any){
    this.wardId=id;
    this.wardBed=bednumber;
    this.wardSection=section;
  }
  
  //update ward section details
  updatewardsection(data:any){
    let url = server_addr + '/updateWardSection';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.put(url,data,{headers, responseType: 'json' });
  }

   //Delete patient ward section details
   deletePatientWardById(id:any){
    let url = server_addr + '/deletewardSection/'+id;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.delete(url,{headers, responseType: 'json' });
  }

      //insert ward section patient details
      insert_wardSectionPatient(data:any){
        let url = server_addr + '/insertwardsectionPatient';
        let token = localStorage.getItem('token');
        let tokenStr='Bearer '+token;
        const headers=new HttpHeaders().set("Authorization",tokenStr);
        return this.http.post(url,data,{headers, responseType: 'json' });
      }

      //get ward section details
    getwardSectionPatient(){
      let username = localStorage.getItem("username");
      let url = server_addr + '/getWardPatientBy/' + username;
      let token = localStorage.getItem('token');
      let tokenStr='Bearer '+token;
      const headers=new HttpHeaders().set("Authorization",tokenStr);
      return this.http.get(url,{headers, responseType: 'json' });
    }

   

}
