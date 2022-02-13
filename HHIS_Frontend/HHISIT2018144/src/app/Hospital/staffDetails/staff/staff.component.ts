import { Component, OnInit, ViewChild} from '@angular/core';
import { exportStaff } from '../../../classes/exportStaff';

import { MatTableDataSource }  from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StaffFormComponent, StaffModel } from '../staff-form/staff-form.component';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HhisServiceService } from '../../../services/hhis-service.service';
import { StaffService } from '../../../services/staff.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  ELEMENT_DATA: exportStaff[]=[];
  displayedColumns:string[]=['name','phoneNo','nic','joindDate','staffRole','action'];
  dataSource = new MatTableDataSource<exportStaff>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private hhisservice:HhisServiceService,public dialog: MatDialog,public snackBar: MatSnackBar,private service:StaffService) { }

  staff: StaffModel = new StaffModel();

  ngOnInit(): void {
    this.getStaff();
  }
  getStaff(){
    this.hhisservice.get_staff().subscribe(res=>{
      this.dataSource.data=res as exportStaff[];
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
    const dialogRef = this.dialog.open(StaffFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.getStaff();
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
    
      console.log(`Dialog result: ${result}`);
      
    });
  }

  onEdit(data:any):void{
    this.service.populateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    const dialogRef = this.dialog.open(StaffFormComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.getStaff();
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
    
      console.log(`Dialog result: ${result}`);
      
    });
  }

  onDelete(data:StaffModel){
    const confirm = window.confirm("Are you sure want to delete ?");
    if(confirm){
      this.service.deleteStaffById(data.id).subscribe(res=>{
        this.getStaff();
      })
    }
    
  }
 
}


