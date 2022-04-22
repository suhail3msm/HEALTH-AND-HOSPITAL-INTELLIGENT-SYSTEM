import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';
import { DoctorPrescriptionComponent } from '../doctor-prescription/doctor-prescription.component';

@Component({
  selector: 'app-edit-doctor-prescription',
  templateUrl: './edit-doctor-prescription.component.html',
  styleUrls: ['./edit-doctor-prescription.component.scss']
})
export class EditDoctorPrescriptionComponent implements OnInit {

  constructor(public snackBar: MatSnackBar,public doctorService:DoctorService,private userService:UserService,private dialogRef: MatDialogRef<DoctorPrescriptionComponent>) { }
  
  role=localStorage.getItem("role");
  elementData:any;

  ngOnInit(): void {
   
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

        onSubmit(){
          if(this.role=='pharmacist'){
            this.doctorService.medicineDescriptionForm.value.patientName=this.doctorService.medicineDescriptionForm.value.patientName;
            this.doctorService.medicineDescriptionForm.value.age=this.doctorService.medicineDescriptionForm.value.age;
            this.doctorService.medicineDescriptionForm.value.status="accept";
            this.doctorService.medicineDescriptionForm.value.doctorEmail=this.doctorService.medicineDescriptionForm.value.doctorEmail;
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
        
}
