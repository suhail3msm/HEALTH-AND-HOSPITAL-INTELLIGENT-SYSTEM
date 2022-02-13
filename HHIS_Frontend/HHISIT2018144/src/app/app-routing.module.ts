import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { StaffComponent } from './Hospital/staffDetails/staff/staff.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {path:'index',component:IndexComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuardGuard],children:[
    { path: 'das/home', canActivate:[AuthGuardGuard],component: HomeComponent},
    { path: 'das/dashboard', canActivate:[AuthGuardGuard],component: DashboardComponent },
    { path: 'das/staff', canActivate:[AuthGuardGuard],component: StaffComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
