import { Component, OnInit, ViewChild } from '@angular/core';
import { exportDoctor } from 'src/app/classes/exportDoctor';

import { MatTableDataSource }  from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DoctorFormComponent } from '../doctor-form/doctor-form.component';
import { ViewDoctorDetailsComponent } from '../view-doctor-details/view-doctor-details.component';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  ELEMENT_DATA: exportDoctor[]=[];
  displayedColumns:string[]=['name','phoneNo','nic','joindDate','gender','doctorSpecialty','action'];
  dataSource = new MatTableDataSource<exportDoctor>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private service:DoctorService) { }

  

  ngOnInit(): void {
    this.get_Doctor();
  }
  get_Doctor(){
    this.service.get_Doctor().subscribe(res=>{
      this.dataSource.data=res as exportDoctor[];
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {

    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    const dialogRef = this.dialog.open(DoctorFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.get_Doctor();
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
    
      console.log(`Dialog result: ${result}`);
      
    });
  }
  onView(data:any):void{
    this.service.populateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%"
    const dialogRef = this.dialog.open(ViewDoctorDetailsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });

  }
  onEdit(data:any):void{
    console.log("yufyufgyu")
    this.service.populateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    const dialogRef = this.dialog.open(DoctorFormComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.get_Doctor();
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
    
      console.log(`Dialog result: ${result}`);
      
    });
  }

  onDelete(data:any){
    const confirm = window.confirm("Are you sure want to delete ?");
    if(confirm){
      this.service.deleteDoctorById(data.id).subscribe(res=>{
        this.get_Doctor();
      })
    }
    
  }
}
