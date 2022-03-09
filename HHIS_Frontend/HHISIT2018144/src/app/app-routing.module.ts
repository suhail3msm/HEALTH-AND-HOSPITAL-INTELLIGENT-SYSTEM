import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { StaffComponent } from './Hospital/staffDetails/staff/staff.component';
import { DoctorComponent } from './Hospital/doctorDetails/doctor/doctor.component';
import { WardComponent } from './Hospital/wardDetails/ward/ward.component';
import { WardSectionComponent } from './Hospital/wardDetails/ward-section/ward-section.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {path:'index',component:IndexComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuardGuard],children:[
    { path: 'das/home', canActivate:[AuthGuardGuard],component: HomeComponent},
    { path: 'das/dashboard', canActivate:[AuthGuardGuard],component: DashboardComponent },
    { path: 'das/staff', canActivate:[AuthGuardGuard],component: StaffComponent },
    { path: 'das/doctor', canActivate:[AuthGuardGuard],component: DoctorComponent },
    { path: 'das/ward', canActivate:[AuthGuardGuard],component: WardComponent,children:[
      { path: 'ward/Section/:id', component: WardSectionComponent,canActivate:[AuthGuardGuard]},
    ] },
    
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
