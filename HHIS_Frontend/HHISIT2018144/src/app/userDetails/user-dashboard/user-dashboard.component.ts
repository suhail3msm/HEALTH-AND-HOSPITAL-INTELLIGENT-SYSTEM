import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { exportAppointment } from 'src/app/classes/exportAppointment';
import { SettingComponent } from 'src/app/header/setting/setting.component';
import { ViewAppointmentComponent } from 'src/app/Hospital/hospital-appointments/view-appointment/view-appointment.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { HhisServiceService } from 'src/app/services/hhis-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  selectedDevice:any;
  username=localStorage.getItem("username")

  appointments:any;
  ELEMENT_DATA: exportAppointment[]=[];
  displayedColumns:string[]=['patientName','patientNic','appointmentDate','appointmentTime','injury','status','action'];
  dataSource = new MatTableDataSource<exportAppointment>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  constructor(private appointmentService:AppointmentService,private hhisServiceService:HhisServiceService, private doctorService:DoctorService,public dialog: MatDialog,private router:Router,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAppointment();
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }
  setting(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="55%"
    const dialogRef = this.dialog.open(SettingComponent,dialogConfig);
    
      dialogRef.afterClosed().subscribe(result => {
    
        if(result==true){
          this.snackBar.open('Password is updated','Done',{
            duration:2000,
          });
        }
        console.log(`Dialog result: ${result}`);
        
      });
}

getAppointment(){
  this.appointmentService.getAppointment().subscribe((res:any)=>{
    this.dataSource.data=res as  exportAppointment[];
    this.appointments=res;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.data);
  })
}



applyFilter(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
applyFilter1(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

onEdit(data:any){
    this.appointmentService.setDataAppointmentForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%"
    const dialogRef = this.dialog.open(ViewAppointmentComponent,dialogConfig);
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
        this.getAppointment();
      }else{
        this.getAppointment();
      }
  })
  
}

}
