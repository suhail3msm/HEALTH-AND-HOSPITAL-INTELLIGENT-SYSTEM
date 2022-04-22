import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const server_addr = "http://localhost:8082";

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {

  constructor(private http:HttpClient) { }

  medicineForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    medicineName: new FormControl('',Validators.required),
    medicineQnt: new FormControl('',Validators.required),
    medicineTabs: new FormControl('',Validators.required),
    uploadDate: new FormControl('',Validators.required),
    hospitalName: new FormControl(null)
  });

  initializeFormGroup() {
    this.medicineForm.setValue({
      id:"",
      medicineName:"",
      medicineQnt:"",
      medicineTabs:"",
      uploadDate:"",
      hospitalName:localStorage.getItem('hospitalName')
  });
  }

 //update medicine file details
 uploadMedicineFile(data:any){
  let url = server_addr + '/saveMedicineDetails' ;
  let token = localStorage.getItem('token');
  let tokenStr='Bearer '+token;
  const headers=new HttpHeaders().set("Authorization",tokenStr);
  return this.http.post(url,data,{headers, responseType: 'json' });
}

  //get medicine details
  getMedicineDetails(){
    let hospitalName = localStorage.getItem("hospitalName");
    let url = server_addr + '/getMedicineBy/' + hospitalName;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

 //Delete Medicine details
 deleteMedicineId(id:any){
  let url = server_addr + '/deleteMedicine/'+id;
  let token = localStorage.getItem('token');
  let tokenStr='Bearer '+token;
  const headers=new HttpHeaders().set("Authorization",tokenStr);
  return this.http.delete(url,{headers, responseType: 'json' });
}

  //update Medicine details
  updateMedicine(data:any){
    let url = server_addr + '/updateMedicine';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.put(url,data,{headers, responseType: 'json' });
  }

   //count new patient Medicine details
   getPatientPendingStatus(){
    let hospitalName = localStorage.getItem("hospitalName");
    let url = server_addr + '/getPendingStatus/' + hospitalName;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

   // get patient Description Details 
   patientDescriptionDetails(){
    let username = localStorage.getItem("username");
    let url = server_addr + '/getMedicineDoctorBy/' + username;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }
  //get Chart details
  get_Chart(){
    let username = localStorage.getItem("username");
    let url = server_addr + '/getMedicineMonthlyCount/' + username;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

  //getUserMedicineDetailsByHospitalName
  getUserMedicineDetailsByHospitalName(){
    let hospitalName = localStorage.getItem("hospitalName");
    let url = server_addr + '/getUserMedicineDetailsByHospitalName/' + hospitalName;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

  //get UserMedicine Accept Details By Hospital Name
  getUserMedicineAcceptDetailsByHospitalName(){
    let hospitalName = localStorage.getItem("hospitalName");
    let url = server_addr + '/getUserMedicineAcceptDetailsByHospitalName/' + hospitalName;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

  populateForm(medicine: any) {
    medicine.hospitalName=localStorage.getItem('username');
    medicine.medicineQnt=medicine.medicineQnt/medicine.medicineTabs;
    this.medicineForm.setValue(medicine);
  }

}

