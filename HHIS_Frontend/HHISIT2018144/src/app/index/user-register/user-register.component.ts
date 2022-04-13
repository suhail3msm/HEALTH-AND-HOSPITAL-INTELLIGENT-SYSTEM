import { Component, OnInit } from '@angular/core';
import { HhisServiceService } from 'src/app/services/hhis-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  constructor(public service:UserService, private hhssService:HhisServiceService) { }

  ngOnInit(): void {
  }
  role="user";
  data:any
  onSubmit(){
    this.service.saveUser(this.service.userRegister.value).subscribe(res=>{
      console.log(res);
      this.data=res;
      if(this.data.error==null){
        this.hhssService.saveLogin(this.service.userRegister.value.email,
          this.service.userRegister.value.password,this.role,this.service.userRegister.value.NIC).subscribe(logUser=>{
            console.log(logUser);
          })
      }else{
        alert(this.data.error);
      }
      
    })
  }
}
