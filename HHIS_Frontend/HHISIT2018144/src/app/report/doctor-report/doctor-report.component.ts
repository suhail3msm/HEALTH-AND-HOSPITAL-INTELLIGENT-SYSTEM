import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { exportDoctor } from 'src/app/classes/exportDoctor';
import { DoctorService } from 'src/app/services/doctor.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-doctor-report',
  templateUrl: './doctor-report.component.html',
  styleUrls: ['./doctor-report.component.scss']
})
export class DoctorReportComponent implements OnInit {

  ELEMENT_DATA: exportDoctor[]=[];
  displayedColumns:string[]=['name','phoneNo','nic','joindDate','gender','doctorSpecialty'];
  dataSource = new MatTableDataSource<exportDoctor>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
totalMale:any;
totalFemale:any;
dataSr:any;

  constructor(public dialog: MatDialog,public snackBar: MatSnackBar,private service:DoctorService) { }

  Allergists:any;
  Dermatologists:any;
  Infectious_disease_doctors:any;
  Ophthalmologists:any;
  Obstetrician:any;
  Cardiologists:any;
  Endocrinologists:any;
  Gastroenterologists:any;
  Nephrologists:any;
  Urologists:any;
  Pulmonologists:any;
  Otolaryngologists:any;
  Neurologists:any;
  Psychiatrists:any;
  Oncologists:any;
  Radiologists:any;
  Rheumatologists:any;
  General_surgeons:any;
  Orthopedic_surgeons:any;
  Cardiac_surgeons:any;
  Anesthesiologists:any;

  ngOnInit(): void {
    this.get_Doctor();
  }
  get_Doctor(){
    this.service.get_Doctor().subscribe((res:any)=>{
      this.dataSource.data=res as exportDoctor[];
      this.dataSource.paginator = this.paginator;

      this.totalMale=res.filter((gender:{gender:string;}) => gender.gender=="male");
      this. totalFemale=res.filter((gender:{gender:string;}) => gender.gender=="female");
      this.Allergists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Allergists");
      this.Dermatologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Dermatologists");
      this.Infectious_disease_doctors=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Infectious disease doctors");
      this.Ophthalmologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Ophthalmologists");
      this.Obstetrician=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Obstetrician/gynecologists");
      this.Cardiologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Cardiologists");
      this.Endocrinologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Endocrinologists");
      this.Gastroenterologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Gastroenterologists");
      this.Nephrologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Nephrologists");
      this.Urologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Urologists");
      this.Pulmonologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Pulmonologists");
      this.Otolaryngologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Otolaryngologists");
      this.Neurologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Neurologists");
      this.Psychiatrists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Psychiatrists");
      this.Oncologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Oncologists");
      this.Radiologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Radiologists");
      this.Rheumatologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Rheumatologists");
      this.General_surgeons=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="General surgeons");
      this.Orthopedic_surgeons=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Orthopedic surgeons");
      this.Cardiac_surgeons=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Cardiac surgeons");
      this.Anesthesiologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Anesthesiologists");

      this.totalMale=this.totalMale.length;
      this.totalFemale=this.totalFemale.length;
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSr=this.dataSource.data;
    for(let i=0;i<this.dataSr.length;i++){
      if(filterValue===this.dataSr[i].doctorSpecialty){
       
        if(this.dataSr[i].gender==="male"){
          this.totalMale=i;
        }
          
        if(this.dataSr[i].gender==="female"){
          this.totalFemale=i;
        }
       
      }
    }
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
      if(filterValue===this.dataSr[i].doctorSpecialty){
       
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
    this.service.getDoctorDateBetween(startDate,endDate).subscribe((res:any)=>{
      this.dataSource.data=res as exportDoctor[];
      this.dataSource.paginator = this.paginator;
      this.dataSr=this.dataSource;
      
      this.totalMale=res.filter((gender:{gender:string;}) => gender.gender=="male");
      this. totalFemale=res.filter((gender:{gender:string;}) => gender.gender=="female");
      this.Allergists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Allergists");
      this.Dermatologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Dermatologists");
      this.Infectious_disease_doctors=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Infectious disease doctors");
      this.Ophthalmologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Ophthalmologists");
      this.Obstetrician=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Obstetrician/gynecologists");
      this.Cardiologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Cardiologists");
      this.Endocrinologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Endocrinologists");
      this.Gastroenterologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Gastroenterologists");
      this.Nephrologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Nephrologists");
      this.Urologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Urologists");
      this.Pulmonologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Pulmonologists");
      this.Otolaryngologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Otolaryngologists");
      this.Neurologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Neurologists");
      this.Psychiatrists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Psychiatrists");
      this.Oncologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Oncologists");
      this.Radiologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Radiologists");
      this.Rheumatologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Rheumatologists");
      this.General_surgeons=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="General surgeons");
      this.Orthopedic_surgeons=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Orthopedic surgeons");
      this.Cardiac_surgeons=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Cardiac surgeons");
      this.Anesthesiologists=res.filter((doctorSpecialty:{doctorSpecialty:string;}) => doctorSpecialty.doctorSpecialty=="Anesthesiologists");

      this.totalMale=this.totalMale.length;
      this.totalFemale=this.totalFemale.length;
     
    })
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

      PDF .save('Doctor_Report.pdf'); // Generated PDF

    });
  }


}
