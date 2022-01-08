import { Component, OnInit, ViewChild} from '@angular/core';
import { exportStaff } from '../classes/exportStaff';
import { HhisServiceService } from '../hhis-service.service';
import { MatTableDataSource }  from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  ELEMENT_DATA: exportStaff[]=[];
  displayedColumns:string[]=['name','phoneNo','nic','joindDate','staffRole'];
  dataSource = new MatTableDataSource<exportStaff>(this.ELEMENT_DATA);
 
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private hhisservice:HhisServiceService) { }

  ngOnInit(): void {
    this.getStaff();
  }
  getStaff(){
    this.hhisservice.get_staff().subscribe(res=>{
      this.dataSource.data=res as exportStaff[];
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource.data);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

