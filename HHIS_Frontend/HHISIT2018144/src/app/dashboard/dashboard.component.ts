import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { AccountService } from '../services/account.service';
import { DoctorService } from '../services/doctor.service';
import { HhisServiceService } from '../services/hhis-service.service';
import { PharmacyService } from '../services/pharmacy.service';
import { WardService } from '../services/ward.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  // bar
  staffChart: ChartData<'bar'> = {
    labels: [
      "nurse practitioners",
      "enrolled nurses",
      "registered nurses",
      "pharmacists",
      "dietitians",
      "occupational therapists",
      "clinical assistants",
      "porters",
      "ward clerks" ],
    datasets: [
      {
        data: [],
      }
    ]
  };

  public barChartLegend = false;
  public barChartPlugins = [];


  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
 
  // pie
  accountChart: ChartData<'doughnut'> = {
    labels: [
      "doctor",
      "pharmacist",
      "admin",
    "nurse" ],
    datasets: [
      {
        data: [],
      }
    ]
  };
  
  
  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: false,
  };
  
  public pieChartLegend = false;
  public pieChartPlugins = [];
  

  constructor(private pharmacyService:PharmacyService,private WardService:WardService,private HhisService:HhisServiceService,private accountService:AccountService,private doctorService:DoctorService) { }
  
  totalStaff:any;
  nurse_practitioners:any;
  enrolled_nurses :any;
  registered_nurses:any;
  pharmacists:any;
  dietitians:any;
  occupational_therapists:any;
  clinical_assistants:any;
  porters:any;
  ward_clerks:any;

  totalNurse=0;
  totalTherapists=0;
  totalMaleStaff:any;
  totalFemaleStaff:any;
  TotalClerks=0;

  totalAccount:any;
  doctorAccount:any;
  pharmacistsAccount:any;
  adminAccount:any;
  nurseAccount:any;

  totalDoctors:any;
  totalWard: any;
  totalAdmitPatients:any;
  totalMedicine:any;
  totalDischargePatient:any;


  ngOnInit(): void {
    this.getStaffDetails();
    this.getAccountInfo();
    this.getDoctor();
    this.getWard();
    this.getWardPatientByEmail();
    this.getMedicineInfo();
    this.getDischargePatientDetails();
  }

  getDischargePatientDetails(){
    this.WardService.getwardSectionPatient().subscribe(res=>{
      this.totalDischargePatient=res;
    })
  }
  getMedicineInfo(){
    this.pharmacyService.getMedicineDetails().subscribe(res=>{
      this.totalMedicine=res;
    })
  }

  getStaffDetails(){
    this.HhisService.get_staff().subscribe((res:any)=>{
      this.totalStaff=res;
      console.log(res);
      this.nurse_practitioners=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="nurse practitioners");
      this.enrolled_nurses=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="enrolled nurses");
      this.registered_nurses=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="registered nurses");
      this.pharmacists=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="pharmacists");
      console.log(this.registered_nurses);
      this.dietitians=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="dietitians");
      this.occupational_therapists=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="occupational therapists");
      this.clinical_assistants=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="clinical assistants");
      this.porters=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="porters");
      this. ward_clerks=res.filter((staffRole:{staffRole:string;}) => staffRole.staffRole=="ward clerks");
      
      this. totalMaleStaff=res.filter((gender:{gender:string;}) => gender.gender=="male");
      this. totalFemaleStaff=res.filter((gender:{gender:string;}) => gender.gender=="female");
      this.staffChart = {
        datasets: [
          {
            data: [this.nurse_practitioners?.length,this.enrolled_nurses?.length,this.registered_nurses?.length,
              this.pharmacists?.length,this.dietitians?.length,this.occupational_therapists?.length,this.clinical_assistants?.length,
              this.porters?.length,this. ward_clerks?.length
            ]
          }
        ]
      };
      this.totalNurse=this.nurse_practitioners?.length+this.enrolled_nurses?.length+this.registered_nurses?.length;
      this.ward_clerks=this.ward_clerks?.length;
    })
  }

  getAccountInfo(){
    
    this.accountService.getUserDetails().subscribe((res:any)=>{
      
      this.totalAccount=res;
      this.doctorAccount=res.filter((role:{role:string;}) => role.role=="doctor");
      this.pharmacistsAccount=res.filter((role:{role:string;}) => role.role=="pharmacist");
      this.adminAccount=res.filter((role:{role:string;}) => role.role=="admin");
      this.nurseAccount=res.filter((role:{role:string;}) => role.role=="nurse");
      this.accountChart = {
        datasets: [
          {
            data: [this.doctorAccount?.length,this.pharmacistsAccount?.length,this.adminAccount?.length,this.nurseAccount?.length]
          }
        ]
      };
    })
  }

  getDoctor(){
    this.doctorService.get_Doctor().subscribe(res=>{
      this.totalDoctors=res;
    })
  }

  getWard(){
    this.WardService.get_ward().subscribe(res=>{
      this.totalWard=res;
    })
  }

  getWardPatientByEmail(){
    this.WardService.getWardPatientBy().subscribe((res:any)=>{
      this.totalAdmitPatients=res.filter((status:{status:string}) => status.status!="no");
    })
  }

}
