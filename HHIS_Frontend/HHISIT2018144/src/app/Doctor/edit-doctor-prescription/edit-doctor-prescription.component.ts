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
}
