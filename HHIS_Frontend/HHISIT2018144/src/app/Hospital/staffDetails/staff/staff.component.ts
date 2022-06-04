import { Component, OnInit, ViewChild} from '@angular/core';
import { exportStaff } from '../../../classes/exportStaff';

import { MatTableDataSource }  from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StaffFormComponent, StaffModel } from '../staff-form/staff-form.component';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HhisServiceService } from '../../../services/hhis-service.service';
import { StaffService } from '../../../services/staff.service';
import { ViewStaffDetailsComponent } from '../view-staff-details/view-staff-details.component';
import { ChartConfiguration, ChartData } from 'chart.js';
import { FormControl, FormGroup } from '@angular/forms';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

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

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public barChartLegend = false;
  public barChartPlugins = [];

  ELEMENT_DATA: exportStaff[]=[];
  displayedColumns:string[]=['name','phoneNo','nic','joindDate','staffRole','gender','action'];
  dataSource = new MatTableDataSource<exportStaff>(this.ELEMENT_DATA);
 dataSr:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
totalMale:any;
totalFemale:any;

  constructor(private hhisservice:HhisServiceService,public dialog: MatDialog,public snackBar: MatSnackBar,private service:StaffService) { }

  staff: StaffModel = new StaffModel();

  ngOnInit(): void {
    this.getStaff();
  }
  getStaff(){
    this.hhisservice.get_staff().subscribe((res:any)=>{
      this.dataSource.data=res as exportStaff[];
      this.dataSource.paginator = this.paginator;
      this.totalMale=res.filter((gender:{gender:string;}) => gender.gender=="male");
      this. totalFemale=res.filter((gender:{gender:string;}) => gender.gender=="female");
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
      this.totalMale=this.totalMale.length;
      this.totalFemale=this.totalFemale.length;
      this.staffChart = {
        datasets: [
          {
            data: [this.nurse_practitioners?.length,this.enrolled_nurses?.length,this.registered_nurses?.length,
              this.pharmacists?.length,this.dietitians?.length,this.occupational_therapists?.length,this.clinical_assistants?.length,
              this.porters?.length,this. ward_clerks?.length
            ],
            backgroundColor:['#0a6a31', '#ff2200', '#3e4c99','#034f1f', '#cc00ff', '#99a8fb','#eaa017', '#348ff1', '#d0ff00'],
          }
        ]
      };
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSr=this.dataSource.data;
    for(let i=0;i<this.dataSr.length;i++){
      if(filterValue===this.dataSr[i].staffRole){
       
        if(this.dataSr[i].gender==="male"){
          this.totalMale=i;
        }
          
        if(this.dataSr[i].gender==="female"){
          this.totalFemale=i;
        }
       
      }
    }
  }

  listStaffDateBtwn(){
    let startDate= formatDate(this.dateRange.value.start, 'yyyy-MM-dd','en-US');
    let endDate= formatDate(this.dateRange.value.end, 'yyyy-MM-dd','en-US');
    this.service.getStaffDateBetween(startDate,endDate).subscribe((res:any)=>{
      this.dataSource.data=res as exportStaff[];
      this.dataSource.paginator = this.paginator;
      this.dataSr=this.dataSource;
      this.totalMale=res.filter((gender:{gender:string;}) => gender.gender=="male");
      this. totalFemale=res.filter((gender:{gender:string;}) => gender.gender=="female");
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
      this.totalMale=this.totalMale.length;
      this.totalFemale=this.totalFemale.length;
      this.staffChart = {
        datasets: [
          {
            data: [this.nurse_practitioners?.length,this.enrolled_nurses?.length,this.registered_nurses?.length,
              this.pharmacists?.length,this.dietitians?.length,this.occupational_therapists?.length,this.clinical_assistants?.length,
              this.porters?.length,this. ward_clerks?.length
            ],
            backgroundColor:['#0a6a31', '#ff2200', '#3e4c99','#034f1f', '#cc00ff', '#99a8fb','#eaa017', '#348ff1', '#d0ff00'],
          }
        ]
      };
    })
  }

  onRoleChange(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSr=this.dataSource.data;
    for(let i=0;i<this.dataSr.length;i++){
      if(filterValue===this.dataSr[i].staffRole){
       
        if(this.dataSr[i].gender==="male"){
          this.totalMale=i;
        }
          
        if(this.dataSr[i].gender==="female"){
          this.totalFemale=i;
        }
       
      }
    }
  }

  onGenderChange(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSr=this.dataSource.data;
    for(let i=0;i<this.dataSr.length;i++){
      if(filterValue===this.dataSr[i].staffRole){
       
        if(this.dataSr[i].gender==="male"){
          this.totalMale=i;
        }
          
        if(this.dataSr[i].gender==="female"){
          this.totalFemale=i;
        }
       
      }
    }
  }

  openPDF() {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF .save('Staff_Report.pdf'); // Generated PDF

    });
  }

  openDialog() {

    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    const dialogRef = this.dialog.open(StaffFormComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.getStaff();
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
    
      console.log(`Dialog result: ${result}`);
      
    });
  }
  onView(data:any):void{
    this.service.populateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="70%"
    const dialogRef = this.dialog.open(ViewStaffDetailsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });

  }
  onEdit(data:any):void{
    this.service.populateForm(data);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    const dialogRef = this.dialog.open(StaffFormComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      
      if(result==true){
        this.getStaff();
        this.snackBar.open('New Record are save','Done',{
          duration:2000,
        });
      }
    
      console.log(`Dialog result: ${result}`);
      
    });
  }

  onDelete(data:StaffModel){
    const confirm = window.confirm("Are you sure want to delete ?");
    if(confirm){
      this.service.deleteStaffById(data.id).subscribe(res=>{
        this.getStaff();
      })
    }
    
  }
 
}


