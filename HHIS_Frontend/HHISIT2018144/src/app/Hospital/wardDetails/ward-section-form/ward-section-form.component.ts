import { Component, OnInit } from '@angular/core';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-ward-section-form',
  templateUrl: './ward-section-form.component.html',
  styleUrls: ['./ward-section-form.component.scss']
})
export class WardSectionFormComponent implements OnInit {

  constructor(public service:WardService) { }

  ngOnInit(): void {
  }

  onSubmit():void{
   
      this.service.insert_wardSection(this.service.wardSectionForm.value).subscribe(res=>{
        console.log(res);
      });
  
  }

}
