import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-prescription',
  templateUrl: './doctor-prescription.component.html',
  styleUrls: ['./doctor-prescription.component.scss']
})
export class DoctorPrescriptionComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,public doctorService:DoctorService,private userService:UserService,private dialogRef: MatDialogRef<DoctorPrescriptionComponent>) { }
userDetails:any;
index:any;
myDate:any;
myYear:any;
myMonth:any;
myTime:any;
error:any;
valid=true;
elementData:any;
  ngOnInit(): void {
 
  }
  onSubmit(){
    if(this.doctorService.medicineDescriptionForm.value.token==null){
      this.myDate = formatDate(new Date(), 'dd', 'en');
      this.myMonth = formatDate(new Date(), 'MMM', 'en');
      this.myYear = formatDate(new Date(), 'yyyy', 'en');
      this.myTime = formatDate(new Date(), 'hh:mm', 'en');
      this.doctorService.medicineDescriptionForm.value.patientName=this.userDetails.name;
      this.doctorService.medicineDescriptionForm.value.age=this.userDetails.age;
      this.doctorService.medicineDescriptionForm.value.status="pending";
      this.doctorService.medicineDescriptionForm.value.doctorEmail=localStorage.getItem('username');
      this.doctorService.medicineDescriptionForm.value.hospitalName=localStorage.getItem('hospitalName');
      this.doctorService.medicineDescriptionForm.value.descrDate=this.myDate;
      this.doctorService.medicineDescriptionForm.value.descrMonth=this.myMonth;
      this.doctorService.medicineDescriptionForm.value.descrYear=this.myYear;
      this.doctorService.medicineDescriptionForm.value.descrTime=this.myTime;
      this.doctorService.patientMadicineTable(this.doctorService.medicineDescriptionForm.value).subscribe(res=>{
        this.elementData=res;
        for(let i=0;this.elementData.medicineName.length > i;i++){
          this.doctorService.onRemoveMedicine(i);
         }
        console.log(res);
      })
    }else{
      this.doctorService.medicineDescriptionForm.value.patientName=this.doctorService.medicineDescriptionForm.value.patientName;
      this.doctorService.medicineDescriptionForm.value.age=this.doctorService.medicineDescriptionForm.value.age;
      this.doctorService.medicineDescriptionForm.value.status="pending";
      this.doctorService.medicineDescriptionForm.value.doctorEmail=localStorage.getItem('username');
      this.doctorService.medicineDescriptionForm.value.hospitalName=localStorage.getItem('hospitalName');
      this.doctorService.medicineDescriptionForm.value.descrDate=this.doctorService.medicineDescriptionForm.value.descrDate;
      this.doctorService.patientMadicineTable(this.doctorService.medicineDescriptionForm.value).subscribe(res=>{
        this.elementData=res;
        for(let i=0;this.elementData.medicineName.length > i;i++){
          this.doctorService.onRemoveMedicine(i);
         }
        console.log(res);
      })
    }
  
  }

  getNic(event:any){
    const filterValue = (event.target as HTMLInputElement).value;
      if(filterValue.length==9 || filterValue.length==10 || filterValue.length==12){
        this.valid=true;
        this.userService.getUserDetailsByNic(filterValue).subscribe(res=>{
          if(res){
            this.userDetails=res;
            this.doctorService.medicineDescriptionForm.value.patientName=this.userDetails.name;
            this.doctorService.medicineDescriptionForm.value.age=this.userDetails.age;
          }else{
            alert("Type Valid NIC Number")
          }
         
        })
      }else{
        this.error="Type Valid NIC Number";
        this.valid=false;
      }
  }

  cancel(){
    let ln=this.doctorService.medicineDescriptionForm.value.medicineName.length;
    for(let i=0;ln > i;i++){
      this.doctorService.onRemoveMedicine(i);
      this.doctorService.onRemoveMedicine(i);
      this.doctorService.onRemoveMedicine(i);
      console.log(i)
     }

      this.dialogRef.close();
    
    
      }
}
