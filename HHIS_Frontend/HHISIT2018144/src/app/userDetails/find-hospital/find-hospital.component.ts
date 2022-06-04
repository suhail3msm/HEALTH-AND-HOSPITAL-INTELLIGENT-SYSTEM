import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exportHospital } from 'src/app/classes/exportHospital';
import { AppointmentService } from 'src/app/services/appointment.service';
import { HhisServiceService } from 'src/app/services/hhis-service.service';
import { GetAppointmentComponent } from '../get-appointment/get-appointment.component';

@Component({
  selector: 'app-find-hospital',
  templateUrl: './find-hospital.component.html',
  styleUrls: ['./find-hospital.component.scss']
})
export class FindHospitalComponent implements OnInit {

  constructor(private HhisServiceService:HhisServiceService,public dialog: MatDialog,public snackBar: MatSnackBar,public appointmentService:AppointmentService) { }
  hospitalName:string='';
  hospitalDistrict:string='';
  hospitalCity:string='';
  hospitals:any;

  ngOnInit(): void {
    this.getAllHospital();
  }

  getAllHospital(){
    this.HhisServiceService.getAllHospitalRecords().subscribe((res:any)=>{
     
        this.hospitals=res;
        console.log(this.hospitals)
      
    })
   
  }
  searchByHospitalName(){
    if(this.hospitalName != ""){
    this.hospitals = this.hospitals.filter((res: { hos_name: string; })=>{
      return res.hos_name.toLocaleLowerCase().match(this.hospitalName.toLocaleLowerCase());
    })
  }else if(this.hospitalName == ""){
    this.getAllHospital();
  }
}

searchByHospitalDistrict(){
  if(this.hospitalDistrict != ""){
  this.hospitals = this.hospitals.filter((res: { district: string; })=>{
    return res.district.toLocaleLowerCase().match(this.hospitalDistrict.toLocaleLowerCase());
  })
}else if(this.hospitalDistrict == ""){
  this.getAllHospital();
}
}
searchByHospitalCity(){
  if(this.hospitalCity != ""){
  this.hospitals = this.hospitals.filter((res: { city: string; })=>{
    return res.city.toLocaleLowerCase().match(this.hospitalCity.toLocaleLowerCase());
  })
}else if(this.hospitalCity == ""){
  this.getAllHospital();
}
}


getAppointment(hospitalNameData:string){
  this.appointmentService.getHospitalName(hospitalNameData);
  this.appointmentService.initializeAppointmentForm();
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="70%"
  const dialogRef = this.dialog.open(GetAppointmentComponent,dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    
    if(result==true){
      this.snackBar.open('New Record are save','Done',{
        duration:2000,
      });
    }
})
}

}


