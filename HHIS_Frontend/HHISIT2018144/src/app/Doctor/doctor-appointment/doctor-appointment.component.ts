import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { exportAppointment } from 'src/app/classes/exportAppointment';
import { ViewAppointmentComponent } from 'src/app/Hospital/hospital-appointments/view-appointment/view-appointment.component';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.scss']
})
export class DoctorAppointmentComponent implements OnInit {

  appointments:any;
  ELEMENT_DATA: exportAppointment[]=[];
  displayedColumns:string[]=['patientName','patientNic','appointmentDate','appointmentTime','injury','status','action'];
  dataSource = new MatTableDataSource<exportAppointment>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private appointmentService:AppointmentService) { }


  totalAppointmentAccept:any;
  

  ngOnInit(): void {
    this.getAppointment();
  }

  getAppointment(){
    this.appointmentService.getAppointmentByDoctorEmail().subscribe((res:any)=>{
      this.dataSource.data=res as  exportAppointment[];
      this.appointments=res;
      this.dataSource.paginator = this.paginator;
      this.totalAppointmentAccept=res.filter((status:{status:string}) => status.status =="accept");
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
