import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HhisServiceService } from './hhis-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private hhisService:HhisServiceService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot):boolean{
    let role = localStorage.getItem('role');
    let role_allowed = route.data.role;
    if(this.hhisService.is_logged_in() && (role_allowed == undefined || role_allowed === role))
    return true;
    else{
        this.router.navigate(['/']);
        return false;
    }
}
}
