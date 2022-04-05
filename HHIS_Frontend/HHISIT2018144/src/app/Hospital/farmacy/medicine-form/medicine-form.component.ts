import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss']
})
export class MedicineFormComponent implements OnInit {

  constructor(public service:PharmacyService) { }
  medicineTab:any;
  ngOnInit(): void {
  }

  onSubmit(){
    this.medicineTab=this.service.medicineForm.value.medicineTabs;
    this.service.medicineForm.value.medicineQnt = this.medicineTab*this.service.medicineForm.value.medicineQnt;
    this.service.uploadMedicineFile(this.service.medicineForm.value).subscribe(res=>{
      console.log(res);
    })
  }

}
