import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartData, ChartConfiguration } from 'chart.js';
import { exportAllergies } from 'src/app/classes/exportAllergies';
import { exportUser } from 'src/app/classes/exportUser';
import { AllergiesFormComponent } from 'src/app/Doctor/allergies-form/allergies-form.component';
import { EditDoctorPrescriptionComponent } from 'src/app/Doctor/edit-doctor-prescription/edit-doctor-prescription.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { UserService } from 'src/app/services/user.service';
import { BloodPressureComponent } from '../blood-pressure/blood-pressure.component';
import { BloodSugarComponent } from '../blood-sugar/blood-sugar.component';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

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

   //Patient Allergies Table
   ELEMENT_DATA1: exportAllergies[]=[];
   displayedColumns1:string[]=['hospitalName','allergiesType','allergen','reaction','action'];
   dataSource1 = new MatTableDataSource<exportAllergies>(this.ELEMENT_DATA1);


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  totalAppointmentAccept: any;

  constructor(private appointmentService:AppointmentService,private router:Router,public snackBar: MatSnackBar,public doctorService:DoctorService,private userService:UserService,public dialog: MatDialog) { }
  valid=true;
  error:any;
  username=localStorage.getItem("username");
  patientName="";
  bloodGroup="";
  age="";
  sugar=0;

  nic=localStorage.getItem('hospitalName')
 
  public barChartLegend = true;
  public barChartPlugins = [];

 // Sugar chart
  sugarChart: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  };

  // pressure chart
  pressureChart: ChartData<'line'> = {
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

  public barChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: false,
  };

  ngOnInit(): void {
    this.getNic();
    this.getAppointment();
    this.getAllergies();
  }

 // Get patient NIC 
    getNic(){
     
          this.userService.getUserDetailsByNic(this.nic).subscribe((res:any)=>{
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
              
            }else{
              alert("Type Valid NIC Number")
            }
           
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
                fill: false,
        backgroundColor: '#006eff',
        borderColor: '#006eff',
               
              }
            ]
          };
        }else{
          this.Pressure=0
        }
        
      })
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


 getAppointment(){
  this.appointmentService.getAppointment().subscribe((res:any)=>{
    this.totalAppointmentAccept=res.filter((status:{status:string}) => status.status =="accept");

  })
}


     //  get Allergies
     getAllergies(){
      this.userService.getAllergies().subscribe((res:any) => {
        this.dataSource1.data=res as exportAllergies[];
          this.dataSource1.paginator = this.paginator;
      });
    }

//Patient Allergies Filter
applyFilter1(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource1.filter = filterValue.trim().toLowerCase();
}

viewAllergies(data:any){
  this.userService.setDataAllergiesForm(data);
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus=true;
  dialogConfig.width="50%"
  const dialogRef = this.dialog.open(AllergiesFormComponent,dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    if(result==true){
      this.snackBar.open('New Record are save','Done',{
        duration:2000,
      });
      this.getAllergies();
    }
  });
 }

}
