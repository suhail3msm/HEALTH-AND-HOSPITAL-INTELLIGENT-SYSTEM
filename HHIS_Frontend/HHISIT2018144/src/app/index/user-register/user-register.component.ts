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

    this.hhssService.saveLogin(this.service.userRegister.value.email,this.service.userRegister.value.password,this.role,this.service.userRegister.value.nic).subscribe(logUser=>{
        if(logUser){
            
          this.service.saveUser(this.service.userRegister.value).subscribe(res=>{
            console.log(res);
            this.data=res;
            if(this.data.error==null){
              
            }else{
              alert(this.data.error);
            }
            
          })

        }else{
          alert("Already Used Email Id Try New One... ");
        }
      },
      (error) => {    //Error callback
        console.error('error caught in component')
        alert("Already Used Email Id Try New One...! ");
      })

  }
}
