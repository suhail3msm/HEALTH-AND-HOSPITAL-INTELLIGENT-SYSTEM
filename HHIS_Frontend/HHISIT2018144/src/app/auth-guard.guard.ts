import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate} from '@angular/router';
import { HhisServiceService } from './services/hhis-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private hhisService:HhisServiceService) { }

  canActivate(route: ActivatedRouteSnapshot):boolean{
    let role = localStorage.getItem('role');
    console.log(role)
    let role_allowed = route.data.role;
    console.log(role_allowed);
    if(this.hhisService.is_logged_in() && (role_allowed == undefined || role_allowed === role))
    return true;
    else{
        return false;
    }
}
}
