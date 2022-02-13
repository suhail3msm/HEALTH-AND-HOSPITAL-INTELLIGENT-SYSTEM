import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor() { }

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
      hospitalId:"",
      jobExpiance:"",
      staffRole:"",
      username:""
    });
  }

}
