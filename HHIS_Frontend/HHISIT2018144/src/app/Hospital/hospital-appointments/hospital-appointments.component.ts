import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { exportAppointment } from 'src/app/classes/exportAppointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { GetAppointmentComponent } from 'src/app/userDetails/get-appointment/get-appointment.component';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';

@Component({
  selector: 'app-hospital-appointments',
  templateUrl: './hospital-appointments.component.html',
  styleUrls: ['./hospital-appointments.component.scss']
})
export class HospitalAppointmentsComponent implements OnInit {

  ELEMENT_DATA: exportAppointment[]=[];
  displayedColumns:string[]=['patientName','patientNic','appointmentDate','appointmentTime','injury','status','action'];
  dataSource = new MatTableDataSource<exportAppointment>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private appointmentService:AppointmentService) { }


  totalAppointmentPending:any;
  totalAppointmentAccept:any;
  totalAppointmentCancel:any;
  

  ngOnInit(): void {
    this.getAppointment();
  }

  getAppointment(){
    this.appointmentService.getAppointmentByHospital().subscribe((res:any)=>{
      this.dataSource.data=res as  exportAppointment[];
      this.dataSource.paginator = this.paginator;
      this.totalAppointmentPending=res.filter((status:{status:string}) => status.status =="pending");
      this.totalAppointmentAccept=res.filter((status:{status:string}) => status.status =="accept");
      this.totalAppointmentCancel=res.filter((status:{status:string}) => status.status =="cancel");
      console.log(this.dataSource.data);
    })
  }



  applyFilter(event:Event){
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
    
      dialogRef.afterClosed().subscribe(result => {
        
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

  searchStatus(data:any){
    const filterValue = data;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
