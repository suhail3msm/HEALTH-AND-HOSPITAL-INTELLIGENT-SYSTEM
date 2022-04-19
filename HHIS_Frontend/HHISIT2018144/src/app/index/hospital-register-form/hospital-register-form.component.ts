import { Component, OnInit } from '@angular/core';
import { HhisServiceService } from 'src/app/services/hhis-service.service';

@Component({
  selector: 'app-hospital-register-form',
  templateUrl: './hospital-register-form.component.html',
  styleUrls: ['./hospital-register-form.component.scss']
})
export class HospitalRegisterFormComponent implements OnInit {
  data: any;

  constructor(public HHISservice:HhisServiceService) { }

  hide = true;
  role="hospital";
  ngOnInit(): void {
  }

  onSubmit(){

    

      this.HHISservice.saveHospital(this.HHISservice.hospitalForm.value).subscribe(res=>{
        console.log(res);
        this.data=res;
        if(this.data.error==null){

          this.HHISservice.saveLogin(this.HHISservice.hospitalForm.value.email,
            this.HHISservice.hospitalForm.value.password,this.role,this.HHISservice.hospitalForm.value.hos_name).subscribe(logUser=>{
             console.log(logUser);
            },
            (error) => {    //Error callback
              console.error('error caught in component')
              alert("Already Used Email Id Try New One...! ");
            })
          
        }else{
          alert(this.data.error);
        }
        
      })

  }

}
