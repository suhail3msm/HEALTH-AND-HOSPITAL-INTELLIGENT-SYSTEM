import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ViewDoctorDetailsComponent } from '../Hospital/doctorDetails/view-doctor-details/view-doctor-details.component';
import { HospitalRegisterFormComponent } from '../index/hospital-register-form/hospital-register-form.component';
import { DoctorService } from '../services/doctor.service';
import { ViewMyProfileComponent } from './view-my-profile/view-my-profile.component';
import { HhisServiceService } from 'src/app/services/hhis-service.service';
import { ViewHospitalProfileComponent } from './view-hospital-profile/view-hospital-profile.component';
import { SettingComponent } from './setting/setting.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private hhisServiceService:HhisServiceService, private doctorService:DoctorService,public dialog: MatDialog,public snackBar: MatSnackBar,private router:Router) {}
username=localStorage.getItem("username");
role=localStorage.getItem('role');
dataSet:any;
doctorData:any;
  ngOnInit(): void {
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }


  myProfile(){
    if(this.role=="hospital"){
      this.hhisServiceService.getHospitalByEmailId().subscribe((res:any) => {
        res.password="111";
        this.hhisServiceService.setValueHospitalForm(res);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus=true;
        dialogConfig.width="60%"
        const dialogRef = this.dialog.open(ViewHospitalProfileComponent,dialogConfig);
        
          dialogRef.afterClosed().subscribe(result => {
      
            if(result==true){
              this.snackBar.open('Update is Successful','Done',{
                duration:2000,
              });
            }
            console.log(`Dialog result: ${result}`);
            
          });
          
      })
    

    }else{
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="70%"
      const dialogRef = this.dialog.open(ViewMyProfileComponent,dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        
      });
    }
   
    
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

  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
