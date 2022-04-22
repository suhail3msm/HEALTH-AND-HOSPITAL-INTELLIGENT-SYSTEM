import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData } from 'chart.js';
import { exportUser } from 'src/app/classes/exportUser';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';
import { BloodPressureComponent } from 'src/app/userDetails/blood-pressure/blood-pressure.component';
import { BloodSugarComponent } from 'src/app/userDetails/blood-sugar/blood-sugar.component';
import { DoctorPrescriptionComponent } from '../doctor-prescription/doctor-prescription.component';
import { EditDoctorPrescriptionComponent } from '../edit-doctor-prescription/edit-doctor-prescription.component';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.scss']
})
export class SearchPatientComponent implements OnInit {
  dataSet: any;
  doctorData: any;
  name: any;
  Pressure=0;
  PatientHospitalVisit=0;
  PatientHospitalAdmit=0;
  chartSugarMonth=[];
  chartSugarLevel=[]
  chartPressureMonth=[];
  chartPressureLevel=[];
  chartMonth=[];
  chartTotal=[];

  //Patient Medicine Table
  ELEMENT_DATA: exportUser[]=[];
  displayedColumns:string[]=['patientNic','hospitalName','numberOfDay','descrDate','status','action'];
  dataSource = new MatTableDataSource<exportUser>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private router:Router,public snackBar: MatSnackBar,public doctorService:DoctorService,private userService:UserService,public dialog: MatDialog) { }
  valid=true;
  show=false;
  error:any;
  username=localStorage.getItem("username");
  patientName="";
  bloodGroup="";
  age="";
  sugar=0;

 
  public barChartLegend = true;
  public barChartPlugins = [];

 // Sugar chart
  sugarChart: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  };

  // pressure chart
  pressureChart: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  };

   // hospitalVisit chart
   hospitalVisitChart: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  };
  public hospitalChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y',
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ngOnInit(): void {
    this.myProfile();
  }

 // Get patient NIC 
    getNic(event:any){
      this.show=false;
      this.patientName="";
      this.bloodGroup="";
      this.age="";
      localStorage.removeItem('nic');
      const filterValue = (event.target as HTMLInputElement).value;
        if(filterValue.length==10 || filterValue.length==12){
          this.valid=true;
          this.userService.getUserDetailsByNic(filterValue).subscribe((res:any)=>{
            if(res){
              localStorage.setItem('nic',res.nic);
              this.patientName=res.name;
              this.bloodGroup=res.bloodGroup;
              this.age=res.age;
              this.getSugar();
              this.getPressure();
              this.getPatientHospitalVisit();
              this.getPatientHospitalAdmit();
              this.getMedicineMonthlyCount();
              this.show=true;
              
            }else{
              alert("Type Valid NIC Number")
            }
           
          })
        }else{
          this.error="Type Valid NIC Number";
          this.valid=false;
        }
    }


    myProfile(){
      
        this.doctorService.get_Doctor().subscribe(res=>{
          this.dataSet=res;
          this.doctorData=this.dataSet.filter((email:{email:string;}) => email.email==this.username);
          this.name=this.doctorData.filter((name:{name:string;}) => name.name);
          console.log("name")
          console.log(this.doctorData)
          localStorage.setItem('name',this.name);
         
        })
      
    }
//  get sugar level
    getSugar(){
      this.userService.getBloodSugar().subscribe((res:any) => {
        if(res){
          this.sugar=res[0].sugerLevel;
          this.chartSugarMonth=res.map((nchackDate:{nchackDate:string;}) => nchackDate.nchackDate);
          this.chartSugarLevel=res.map((sugerLevel:{sugerLevel:string;}) => sugerLevel.sugerLevel);
          this.sugarChart = {
            labels: this.chartSugarMonth,
            datasets: [
              {
                data: this.chartSugarLevel, label: 'Sugar Level',
              }
            ]
          };
        }else{
          this.sugar=0
        }
      })
    }
//  get pressure level
    getPressure(){
      this.userService.getBloodPressure().subscribe((res:any) => {
        if(res){
          this.Pressure=res[0].pressureLevel;
          this.chartPressureMonth=res.map((nchackDate:{nchackDate:string;}) => nchackDate.nchackDate);
          this.chartPressureLevel=res.map((pressureLevel:{pressureLevel:string;}) => pressureLevel.pressureLevel);
          this.pressureChart = {
            labels: this.chartPressureMonth,
            datasets: [
              {
                data: this.chartPressureLevel, label: 'Pressure Level',
                backgroundColor: ['#4d127a', '#845def', '#8211f3'],
                hoverBackgroundColor: ['#131e3a', '#19284d', '#1f3260'],
              }
            ]
          };
        }else{
          this.Pressure=0
        }
        
      })
    }
//  insert sugar level
    addSugar(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="50%"
      const dialogRef = this.dialog.open(BloodSugarComponent,dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result==true){
          this.snackBar.open('New Record are save','Done',{
            duration:2000,
          });
          this.getSugar();
        }
      });
    }
//  insert pressure level
    addPressure(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus=true;
      dialogConfig.width="50%"
      const dialogRef = this.dialog.open(BloodPressureComponent,dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result==true){
          this.snackBar.open('New Record are save','Done',{
            duration:2000,
          });
          this.getPressure();
        }
      });
    }
    //  get patient hospital visited times
getPatientHospitalVisit(){
  this.userService.getPatientMedicineByNic().subscribe((res:any) => {
    this.PatientHospitalVisit=res.length;
    this.dataSource.data=res as exportUser[];
      this.dataSource.paginator = this.paginator;
  });
}
 //  get patient hospital admit times
getPatientHospitalAdmit(){
  this.userService.getPatientWardDetailsByNIC().subscribe((res:any) => {
    this.PatientHospitalAdmit=res.length;
  });
}

 //  get MedicineMonthlyCount
getMedicineMonthlyCount(){
  this.userService.getMedicineMonthlyCountByNic().subscribe((res:any) => {
    if(res){
      this.chartMonth=res.map((month:{month:string;}) => month.month);
      this.chartTotal=res.map((totalPatient:{totalPatient:any;}) => totalPatient.totalPatient);
      this.hospitalVisitChart = {
        labels: this.chartMonth,
        datasets: [
          {
            data: this.chartTotal, label: '2022 Total Hospital Visit Month',
            backgroundColor: ['#00a957', '#217e43', '#3e9988'],
            hoverBackgroundColor: ['#00a938', '#00782c', '#1f6054'],
          }
        ]
      };
    }
  
  });
}

//Patient Table Filter
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
