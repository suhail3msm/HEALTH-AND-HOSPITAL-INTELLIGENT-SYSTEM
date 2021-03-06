import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private router:Router) { }
  role:any;
  ngOnInit(): void {
    this.role=localStorage.getItem('role');
  }
  logout(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
