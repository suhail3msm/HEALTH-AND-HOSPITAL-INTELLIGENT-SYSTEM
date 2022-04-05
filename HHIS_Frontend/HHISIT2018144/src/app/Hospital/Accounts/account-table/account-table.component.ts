import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { exportAccount } from 'src/app/classes/exportAccount';
import { AccountService } from 'src/app/services/account.service';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit {

  ELEMENT_DATA: exportAccount[]=[];
  displayedColumns:string[]=['username','role','password','action'];
  dataSource = new MatTableDataSource<exportAccount>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  role:any;

  constructor(private accountService:AccountService,public dialog: MatDialog,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getuserInfo();
    this.role=localStorage.getItem('role');
  }
  getuserInfo(){
    this.accountService.getUserDetails().subscribe(res=>{
      this.dataSource.data=res as exportAccount[];
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element:any){

  }

  onDelete(element:any){

  }
  openDialog(){

    this.accountService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%"
    const dialogRef = this.dialog.open(AccountComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
        this.getuserInfo();
      }
      console.log(`Dialog result: ${result}`);
      
    });
  }
    
  
}
