import { Component, OnInit } from '@angular/core';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-ward-section-form',
  templateUrl: './ward-section-form.component.html',
  styleUrls: ['./ward-section-form.component.scss']
})
export class WardSectionFormComponent implements OnInit {

  constructor(public service:WardService) { }
  filterValue:any;
  wardSection:any;
  AObject:any;
  BObject:any;
  CObject:any;
  DObject:any;
  EObject:any;
  FObject:any;
  GObject:any;
  section:any
  sectionBedCount=0;
  ngOnInit(): void {
    this.getWardSection();
  }

  // onSubmit():void{
   
  //     this.service.insert_wardSection(this.service.wardSectionForm.value).subscribe(res=>{
  //       console.log(res);
  //     });
  
  // }
  applyFilter(event:Event){
    this.filterValue = (event.target as HTMLInputElement).value;
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
    })
}

onChangeSection(event:any){
  this.section=event;
  console.log(this.section)
  if(this.section === "A"){
    this.sectionBedCount=this.AObject?.length;
  }else if(this.section === "B"){
    this.sectionBedCount=this.BObject?.length;
  }else if(this.section === "C"){
    this.sectionBedCount=this.CObject?.length;
  }else if(this.section === "D"){
    this.sectionBedCount=this.DObject?.length;
  }else if(this.section === "E"){
    this.sectionBedCount=this.EObject?.length;
  }else if(this.section === "F"){
    this.sectionBedCount=this.FObject?.length;
  }else if(this.section === "G"){
    this.sectionBedCount=this.GObject?.length;
  }else{
    this.sectionBedCount=0;
  }
  console.log(this.sectionBedCount)
}

   onSubmit():void{
   
      for(let i=1;i<=this.filterValue;i++){
        this.service.wardSectionForm.value.bedNumber=i+this.sectionBedCount;
        this.service.insert_wardSection1(this.service.wardSectionForm.value).subscribe(res=>{
                 console.log(res);
               });
      }
  
  }

}
