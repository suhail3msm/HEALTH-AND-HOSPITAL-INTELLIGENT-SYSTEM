import { Component, OnInit } from '@angular/core';
import { WardService } from 'src/app/services/ward.service';

@Component({
  selector: 'app-ward-form',
  templateUrl: './ward-form.component.html',
  styleUrls: ['./ward-form.component.scss']
})
export class WardFormComponent implements OnInit {

  constructor(public service:WardService) { }

  ngOnInit(): void {
  }

  onSubmit():void{
    if(this.service.wardForm.value.id < 0){
      this.service.updateward(this.service.wardForm.value).subscribe(res=>{
        console.log(res);
      });
    }else{
      this.service.insert_ward(this.service.wardForm.value).subscribe(res=>{
        console.log(res);
      });
    }
  
  }


}
