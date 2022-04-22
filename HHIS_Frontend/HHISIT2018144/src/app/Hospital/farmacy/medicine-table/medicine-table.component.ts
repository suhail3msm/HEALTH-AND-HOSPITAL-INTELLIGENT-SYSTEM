import { Component, OnInit, ViewChild } from '@angular/core';
import { exportMedicine } from 'src/app/classes/exportMedicine';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { MatTableDataSource }  from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicineFormComponent } from '../medicine-form/medicine-form.component';
import { MadicineExcelFileUploadComponent } from '../madicine-excel-file-upload/madicine-excel-file-upload.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { exportUser } from 'src/app/classes/exportUser';
import { EditDoctorPrescriptionComponent } from 'src/app/Doctor/edit-doctor-prescription/edit-doctor-prescription.component';

@Component({
  selector: 'app-medicine-table',
  templateUrl: './medicine-table.component.html',
  styleUrls: ['./medicine-table.component.scss']
})
export class MedicineTableComponent implements OnInit {
  numberOfPatient:any;

  //upload Medicine Table
  ELEMENT_DATA: exportMedicine[]=[];
  displayedColumns:string[]=['medicineName','medicineQnt','medicineTabs','uploadDate','action'];
  dataSource = new MatTableDataSource<exportMedicine>(this.ELEMENT_DATA);

  //Patient Medicine Table
  ELEMENT_DATA1: exportUser[]=[];
  displayedColumns1:string[]=['patientNic','hospitalName','numberOfDay','descrDate','status','action'];
  dataSource1 = new MatTableDataSource<exportUser>(this.ELEMENT_DATA1);

   //Patient Status Accept Medicine Table
   ELEMENT_DATA2: exportUser[]=[];
   displayedColumns2:string[]=['patientNic','hospitalName','numberOfDay','descrDate','status','action'];
   dataSource2 = new MatTableDataSource<exportUser>(this.ELEMENT_DATA1);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(public doctorService:DoctorService,private service:PharmacyService,public dialog: MatDialog,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMedicineInfo();
    this.getPatientPendingStatus();
    this.getPatientHospitalVisit();
    this.getPatientAccept();
  }
//get Medicine by Table
  getMedicineInfo(){
    this.service.getMedicineDetails().subscribe(res=>{
      this.dataSource.data=res as exportMedicine[];
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }
  //filter data Medicine Table
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
//edit Patient Medicine Table
  onEdit(element:any){
    this.service.populateForm(element);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%"
    const dialogRef = this.dialog.open(MedicineFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
      this.getMedicineInfo();
      console.log(`Dialog result: ${result}`);
      
    });
  }
// delete Patient Medicine Table
  onDelete(element:any){
    this.service.deleteMedicineId(element.id).subscribe(res=>{
      this.getMedicineInfo();
    })
  }
  //insert record excel file into Medicine Table
  openFile(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%"
    const dialogRef = this.dialog.open(MadicineExcelFileUploadComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
      this.getMedicineInfo();
      console.log(`Dialog result: ${result}`);
      
    });
  }

//Insert  Medicine record Table
  openDialog() {

    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%"
    const dialogRef = this.dialog.open(MedicineFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
      this.getMedicineInfo();
      console.log(`Dialog result: ${result}`);
      
    });
  }
// calculate Medicine pending status 
  getPatientPendingStatus(){
    this.service.getPatientPendingStatus().subscribe(res=>{
      this.numberOfPatient=res;
    })
  }
//get Patient Medicine detail on pharmacy Table
  getPatientHospitalVisit(){
    this.service.getUserMedicineDetailsByHospitalName().subscribe((res:any) => {
      console.log(res)
      this.dataSource1.data=res as exportUser[];
        this.dataSource1.paginator = this.paginator;
    });
  }

  
  //filter data Patient Medicine detail
  applyFilter1(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  //get Patient Medicine Accept on pharmacy Table
  getPatientAccept(){
    this.service.getUserMedicineAcceptDetailsByHospitalName().subscribe((res:any) => {
      console.log(res)
      this.dataSource2.data=res as exportUser[];
        this.dataSource2.paginator = this.paginator;
    });
  }

  
  //filter data Patient Medicine detail
  applyFilter2(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  //ViewPatientMedicineDetails
  onViewPatientMedicineDetails(element:any){
    for(let i=0;element.medicineName.length>i;i++){
      this.doctorService.onaddform();
     }
      
     this.doctorService.populatePatientDescriptionForm(element);
    
     console.log(element.medicineName)
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="50%"
      const dialogRef = this.dialog.open(EditDoctorPrescriptionComponent,dialogConfig);
   
      dialogRef.afterClosed().subscribe(result => {
        
        if(result==true){
          this.snackBar.open('New Record are save','Done',{
            duration:2000,
          });
          console.log(this.doctorService.medicineDescriptionForm.value.medicineName.length);
          for(let i=0;this.doctorService.medicineDescriptionForm.value.medicineName.length > i;i++){
            this.doctorService.onRemoveMedicine(i);
            
           }

           this.getPatientPendingStatus();
           this.getPatientHospitalVisit();
           this.getPatientAccept();
        }else{
         
        }
        console.log(`Dialog result: ${result}`);
        for(let i=0;element.medicineName.length > i;i++){
          this.doctorService.onRemoveMedicine(i);
         }
         this.doctorService.medicineDescriptionForm.reset();
      });
  }

}
