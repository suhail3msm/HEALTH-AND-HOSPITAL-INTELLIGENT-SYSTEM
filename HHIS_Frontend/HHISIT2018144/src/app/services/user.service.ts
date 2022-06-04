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
    bloodGroup:new FormControl(''),
    password: new FormControl('',Validators.required)
   
  });

  //blood sugar form
  bloodSugar: FormGroup = new FormGroup({
    id: new FormControl(null),
		patientNic: new FormControl(''),
		nchackDate: new FormControl('',Validators.required),
		sugerLevel: new FormControl('',Validators.required),
		hospitalName: new FormControl(''),
		subervName: new FormControl('')
  })

   //blood Pressure form
   bloodPressure: FormGroup = new FormGroup({
    id: new FormControl(null),
		patientNic: new FormControl(''),
		nchackDate: new FormControl('',Validators.required),
		pressureLevel: new FormControl('',Validators.required),
		hospitalName: new FormControl(''),
		subervName: new FormControl('')
  })

     //Allergies form
     allergies: FormGroup = new FormGroup({
      id: new FormControl(null),
      patientNic: new FormControl(''),
      insertDate: new FormControl('',Validators.required),
      allergiesType: new FormControl('',Validators.required),
      allergen: new FormControl('',Validators.required),
      reaction: new FormControl('',Validators.required),
      patientName: new FormControl(''),
      hospitalName: new FormControl(''),
      subervName: new FormControl('')
    })

    setDataAllergiesForm(data:any){
      this.allergies.setValue(data);
    }

    //insert Allergies details
   insertAllergies(data:any){
    let url = server_addr + '/saveAllergies';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.post(url,data,{headers, responseType: 'json' });
  }
  
  // get Allergies
  getAllergies(){
    let nic=localStorage.getItem("nic");
    let url = server_addr + '/getAllergies/' + nic;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
}

   //insert blood Pressure details
   insertBloodPressure(data:any){
    let url = server_addr + '/saveBloodPressure';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.post(url,data,{headers, responseType: 'json' });
  }
  
   //insert blood Sugar details
   insertBloodSugar(data:any){
    let url = server_addr + '/saveBloodSuger';
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.post(url,data,{headers, responseType: 'json' });
  }

  // get blood Pressure 
  getBloodPressure(){
    let nic=localStorage.getItem("nic");
    let url = server_addr + '/getBloodPressure/' + nic;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

// get blood Sugar 
getBloodSugar(){
  let nic=localStorage.getItem("nic");
  let url = server_addr + '/getBloodSuger/' + nic;
  let token = localStorage.getItem('token');
  let tokenStr='Bearer '+token;
  const headers=new HttpHeaders().set("Authorization",tokenStr);
  return this.http.get(url,{headers, responseType: 'json' });
}

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
  'age':data.age,
  'bloodGroup':data.bloodGroup
});
}

  // get user Details 
  getUserDetailsByNic(data:any){
    let url = server_addr + '/getuserDetails/' + data;
    let token = localStorage.getItem('token');
    let tokenStr='Bearer '+token;
    const headers=new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get(url,{headers, responseType: 'json' });
  }

    // get PatientMadicineByNic Details 
    getPatientMedicineByNic(){
      let nic=localStorage.getItem("nic");
      let url = server_addr + '/getPatientMedicineByNic/' + nic;
      let token = localStorage.getItem('token');
      let tokenStr='Bearer '+token;
      const headers=new HttpHeaders().set("Authorization",tokenStr);
      return this.http.get(url,{headers, responseType: 'json' });
    }

        // get getPatientWardDetailsByNIC Details 
        getPatientWardDetailsByNIC(){
          let nic=localStorage.getItem("nic");
          let url = server_addr + '/getPatientWardDetailsByNIC/' + nic;
          let token = localStorage.getItem('token');
          let tokenStr='Bearer '+token;
          const headers=new HttpHeaders().set("Authorization",tokenStr);
          return this.http.get(url,{headers, responseType: 'json' });
        }

        // get getMedicineMonthlyCountByNic Details 
        getMedicineMonthlyCountByNic(){
          let nic=localStorage.getItem("nic");
          let url = server_addr + '/getMedicineMonthlyCountByNic/' + nic;
          let token = localStorage.getItem('token');
          let tokenStr='Bearer '+token;
          const headers=new HttpHeaders().set("Authorization",tokenStr);
          return this.http.get(url,{headers, responseType: 'json' });
        }
  

}


