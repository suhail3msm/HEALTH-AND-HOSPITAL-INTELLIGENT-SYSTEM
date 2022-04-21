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

@Component({
  selector: 'app-medicine-table',
  templateUrl: './medicine-table.component.html',
  styleUrls: ['./medicine-table.component.scss']
})
export class MedicineTableComponent implements OnInit {
  numberOfPatient:any;
  ELEMENT_DATA: exportMedicine[]=[];
  displayedColumns:string[]=['medicineName','medicineQnt','medicineTabs','uploadDate','action'];
  dataSource = new MatTableDataSource<exportMedicine>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(public doctorService:DoctorService,private service:PharmacyService,public dialog: MatDialog,public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMedicineInfo();
    this.getPatientPendingStatus();
  }

  getMedicineInfo(){
    this.service.getMedicineDetails().subscribe(res=>{
      this.dataSource.data=res as exportMedicine[];
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

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

  onDelete(element:any){
    this.service.deleteMedicineId(element.id).subscribe(res=>{
      this.getMedicineInfo();
    })
  }
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

  getPatientPendingStatus(){
    this.service.getPatientPendingStatus().subscribe(res=>{
      this.numberOfPatient=res;
    })
  }

}
