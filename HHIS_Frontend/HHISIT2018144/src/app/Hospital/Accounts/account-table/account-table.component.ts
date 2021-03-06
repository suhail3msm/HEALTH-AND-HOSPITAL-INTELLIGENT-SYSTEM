import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { exportAccount } from 'src/app/classes/exportAccount';
import { AccountService } from 'src/app/services/account.service';
import { HhisServiceService } from 'src/app/services/hhis-service.service';
import { AccountComponent } from '../account/account.component';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.scss']
})
export class AccountTableComponent implements OnInit {

  ELEMENT_DATA: exportAccount[]=[];
  displayedColumns:string[]=['username','role','action'];
  dataSource = new MatTableDataSource<exportAccount>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  role1:any;

  constructor(private accountService:AccountService,public dialog: MatDialog,public snackBar: MatSnackBar,private hhisServiceService :HhisServiceService ) { }

  ngOnInit(): void {
    this.getuserInfo();
    this.role1=localStorage.getItem('role');
    console.log(this.role1)
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
    this.hhisServiceService.deleteAccountById(element.id).subscribe(res=>{
      this.getuserInfo();
    })

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
        
      }
      console.log(`Dialog result: ${result}`);
      this.getuserInfo();
      
    });
  }
    
  
}
