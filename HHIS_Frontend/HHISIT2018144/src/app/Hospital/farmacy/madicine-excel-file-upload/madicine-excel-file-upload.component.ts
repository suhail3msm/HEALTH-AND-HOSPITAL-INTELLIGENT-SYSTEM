import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-madicine-excel-file-upload',
  templateUrl: './madicine-excel-file-upload.component.html',
  styleUrls: ['./madicine-excel-file-upload.component.scss']
})
export class MadicineExcelFileUploadComponent implements OnInit {

  sorceData:any;
  value=0;
  d=0;

  constructor(private ser:PharmacyService) { }

  ngOnInit(): void {
  }
  onFileUpload(event:any){
    const selectFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectFile);
    fileReader.onload = (event)=>{
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {type:'binary'});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.sorceData = data;
      })
      this.insertData();
    }
  }

  insertData(){
    for(let i=0;i<this.sorceData.length;i++){
      this.ser.uploadMedicineFile(this.sorceData[i]).subscribe(res=>{
        console.log(res);
        this.d = 100/this.sorceData.length;
        this.value=this.value + this.d;
        console.log(this.value);
      })
     
    }
    
  }

}
