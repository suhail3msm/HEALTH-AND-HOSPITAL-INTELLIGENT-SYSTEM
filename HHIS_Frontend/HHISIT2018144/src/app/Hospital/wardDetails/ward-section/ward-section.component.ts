import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WardService } from 'src/app/services/ward.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PatientWardDetailsComponent } from '../patient-ward-details/patient-ward-details.component';
import { LeavePatientWardComponent } from '../leave-patient-ward/leave-patient-ward.component';

@Component({
  selector: 'app-ward-section',
  templateUrl: './ward-section.component.html',
  styleUrls: ['./ward-section.component.scss']
})
export class WardSectionComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute, private service:WardService, public dialog: MatDialog,public snackBar: MatSnackBar) {
    
   }

  id: any;
  wardSection:any;
  AObject:any;
  BObject:any;
  CObject:any;
  DObject:any;
  EObject:any;
  FObject:any;
  GObject:any;

  ngOnInit(): void {
    /*this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      if (this.id) {
        this.getWardSection();
      }
  });*/
  this.getWardSection();
  }

  getWardSection(){
      this.service.get_wardSection(this.service.wardIdSection).subscribe(res=>{
        this.wardSection=res;
        this.AObject = this.wardSection.filter((section: { section: string; }) => section.section === "A");
        this.BObject = this.wardSection.filter((section: { section: string; }) => section.section === "B");
        this.CObject = this.wardSection.filter((section: { section: string; }) => section.section === "C");
        this.DObject = this.wardSection.filter((section: { section: string; }) => section.section === "D");
        this.EObject = this.wardSection.filter((section: { section: string; }) => section.section === "E");
        this.FObject = this.wardSection.filter((section: { section: string; }) => section.section === "F");
        this.GObject = this.wardSection.filter((section: { section: string; }) => section.section === "G");
        console.log(this.AObject);
      })
  }

  onView(data:any):void{
    this.service.populateWardSectionForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%"
    const dialogRef = this.dialog.open(PatientWardDetailsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.snackBar.open('New Record are updated','Done',{
          duration:2000,
        });
      }
      console.log(`Dialog result: ${result}`);
      
    });

  }
  
  leaveWardView(data:any):void{
    data.leavedDate="null";
    data.description="null";
    this.service. populatePatientWardSection(data);
    this.service.setWard(data.id,data.bedNumber,data.section);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%"
    const dialogRef = this.dialog.open(LeavePatientWardComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result==true){
        this.snackBar.open('New Record are updated','Done',{
          duration:2000,
        });
        this.service.updateInitializeWardSectionFormGroup();
        this.service.updatewardsection(this.service.wardSectionForm.value).subscribe(res=>{
          console.log(res);
        })
      }
      console.log(`Dialog result: ${result}`);
      
    });

  }
}
