import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SettingComponent } from 'src/app/header/setting/setting.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { HhisServiceService } from 'src/app/services/hhis-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  username=localStorage.getItem("username")
  
  constructor(private hhisServiceService:HhisServiceService, private doctorService:DoctorService,public dialog: MatDialog,private router:Router,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
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

}
