import { Component, OnInit } from '@angular/core';
import { HhisServiceService } from 'src/app/services/hhis-service.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  hide = true;
  constructor(public HHISservice:HhisServiceService) { }
  dataSet:any;
  ngOnInit(): void {
    this.SetSetting();
  }
  onUpdatePassword(){
    this.HHISservice.updatehhssLoginForm(this.HHISservice.hhssLoginForm.value).subscribe(res=>{
      console.log(res);
    })
  }

  SetSetting(){
    this.HHISservice.gethhssLoginFormByEmailId().subscribe((res:any) => {
      console.log(res)
      res.oldPassword=res.password;
      res.password="";
      console.log(res);
      this.dataSet=res;
      this.HHISservice.setValueLoginForm(res);
    })
  }
}
