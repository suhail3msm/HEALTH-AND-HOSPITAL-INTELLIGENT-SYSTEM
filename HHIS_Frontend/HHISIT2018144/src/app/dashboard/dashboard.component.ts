import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // bar
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public barChartLabels = [
  "nurse practitioners",
  "enrolled nurses ",
  "registered nurses",
  "pharmacists",
  "dietitians",
  "occupational therapists",
  "clinical assistants",
  "porters",
  "ward clerks" ];
  public barChartDatasets = [ {
    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
    data: [ 300, 500, 100,300, 500, 100,300, 500, 100 ]
  } ];
  public barChartLegend = false;
  public barChartPlugins = [];

  // pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = [
  "nurse practitioners",
  "enrolled nurses ",
  "registered nurses",
  "pharmacists",
  "dietitians",
  "occupational therapists",
  "clinical assistants",
  "porters",
  "ward clerks" ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100,300, 500, 100,300, 500, 100 ]
  } ];
  public pieChartLegend = false;
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
  }

}
