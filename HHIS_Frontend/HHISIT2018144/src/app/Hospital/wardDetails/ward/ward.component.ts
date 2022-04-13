import { Component, OnInit, ViewChild } from '@angular/core';
import { exportWard } from 'src/app/classes/exportWard';

import { MatTableDataSource }  from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { WardService } from 'src/app/services/ward.service';
import { WardFormComponent } from '../ward-form/ward-form.component';
import { WardSectionComponent } from '../ward-section/ward-section.component';
import { WardSectionFormComponent } from '../ward-section-form/ward-section-form.component';
import { Router } from '@angular/router';
import { exportDischargePatient } from 'src/app/classes/exportDischargePatient';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.scss']
})
export class WardComponent implements OnInit {

  ELEMENT_DATA: exportWard[]=[];
  displayedColumns:string[]=['id','wardName','numberOfPatient','numberOfDeath','WardSection','action'];
  dataSource = new MatTableDataSource<exportWard>(this.ELEMENT_DATA);

  ELEMENT_DATA1: exportDischargePatient[]=[];
  displayedColumns1:string[]=['patientNIC','patientName','wardId','section','bedNumber','admittedDate','leavedDate'];
  dataSource1 = new MatTableDataSource<exportDischargePatient>(this.ELEMENT_DATA1);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private service:WardService,private router:Router) { }

  

  ngOnInit(): void {
    this.get_ward();
    this.getDischargePatientDetails();
  }
  get_ward(){
    this.service.get_ward().subscribe(res=>{
      this.dataSource.data=res as exportWard[];
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }

  getDischargePatientDetails(){
    this.service.getwardSectionPatient().subscribe(res=>{
      this.dataSource1.data=res as exportDischargePatient[];
      this.dataSource1.paginator = this.paginator;
      console.log(this.dataSource1.data);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter1(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {

    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    const dialogRef = this.dialog.open(WardFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
        this.get_ward();
      }
    
      console.log(`Dialog result: ${result}`);
      
    });
  }
 
  onEdit(data:any):void{
    this.service.populateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    const dialogRef = this.dialog.open(WardFormComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
        this.get_ward();
      }
    
      console.log(`Dialog result: ${result}`);
      
    });

  }

  onAdd(data:any):void{
    this.service.addWardId(data.id);
    this.service.initializewardSectionFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    const dialogRef = this.dialog.open(WardSectionFormComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.get_ward();
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
    
      console.log(`Dialog result: ${result}`);
      
    });

  }

  onView(data:any){
    this.router.navigate;
  }
  onViewBeds(data:any):void{
    this.service.addWardId(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="95%"
    const dialogRef = this.dialog.open(WardSectionComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.snackBar.open('New Record are updated','Done',{
          duration:2000,
        });
      }
      console.log(`Dialog result: ${result}`);
      
    });
}

onViewDischargePatient(data:any):void{
  

}


}