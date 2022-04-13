import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { exportUser } from 'src/app/classes/exportUser';
import { DoctorService } from 'src/app/services/doctor.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { DoctorPrescriptionComponent } from '../doctor-prescription/doctor-prescription.component';

@Component({
  selector: 'app-prescription-table',
  templateUrl: './prescription-table.component.html',
  styleUrls: ['./prescription-table.component.scss']
})
export class PrescriptionTableComponent implements OnInit {

  ELEMENT_DATA: exportUser[]=[];
  displayedColumns:string[]=['patientName','patientNic','age','status','action'];
  dataSource = new MatTableDataSource<exportUser>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(public doctorService:DoctorService,private service:PharmacyService,public dialog: MatDialog,public snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.getMedicineInfo();
  }

  getMedicineInfo(){
    this.service.patientDescriptionDetails().subscribe(res=>{
      this.dataSource.data=res as exportUser[];
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element:any){
   for(let i=0;element.medicineName.length>i;i++){
    this.doctorService.onaddform();
   }
    
   this.doctorService.populatePatientDescriptionForm(element);
  
   console.log(element.medicineName)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%"
    const dialogRef = this.dialog.open(DoctorPrescriptionComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
        console.log(this.doctorService.medicineDescriptionForm.value.medicineName.length);
        for(let i=0;this.doctorService.medicineDescriptionForm.value.medicineName.length > i;i++){
          this.doctorService.onRemoveMedicine(i);
          
         }
      }else{
       
      }
      this.getMedicineInfo();
      console.log(`Dialog result: ${result}`);
      for(let i=0;element.medicineName.length > i;i++){
        this.doctorService.onRemoveMedicine(i);
       }
       this.doctorService.medicineDescriptionForm.reset();
    });
  }

  onDelete(element:any){
    this.doctorService.deletemedicineDescriptionFormById(element.token).subscribe(res=>{
      this.getMedicineInfo();
    })
  }
 


  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%"
    const dialogRef = this.dialog.open(DoctorPrescriptionComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
    
      for(let i=0;this.doctorService.medicineDescriptionForm.value.medicineName.length > i;i++){
        this.doctorService.onRemoveMedicine(i);
        console.log(i);
       }
      this.getMedicineInfo();
      this.doctorService.medicineDescriptionForm.reset();
      console.log(`Dialog result: ${result}`);
      
    });
  }


}
