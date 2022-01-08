import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HhisServiceService } from '../hhis-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = 'admin-panel-layout';
  sideBarOpen = true;

  constructor(private router:Router) { 
    this.router.navigateByUrl('/admin');
  }

  ngOnInit(): void {
  }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

 

}
