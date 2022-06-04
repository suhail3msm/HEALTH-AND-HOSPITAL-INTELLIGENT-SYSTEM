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
import { MedicineTableComponent } from './Hospital/farmacy/medicine-table/medicine-table.component';
import { DoctorPrescriptionComponent } from './Doctor/doctor-prescription/doctor-prescription.component';
import { AccountTableComponent } from './Hospital/Accounts/account-table/account-table.component';
import { PrescriptionTableComponent } from './Doctor/prescription-table/prescription-table.component';
import { SearchPatientComponent } from './Doctor/search-patient/search-patient.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {path:'index',component:IndexComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuardGuard],children:[
    { path: 'das/home', canActivate:[AuthGuardGuard],component: HomeComponent},
    { path: 'das/dashboard', canActivate:[AuthGuardGuard],component: DashboardComponent , data: {
      role: 'hospital'
    }},
    { path: 'das/staff', canActivate:[AuthGuardGuard],component: StaffComponent },
    { path: 'das/doctor', canActivate:[AuthGuardGuard],component: DoctorComponent },
    { path: 'das/ward', canActivate:[AuthGuardGuard],component: WardComponent},
    {path:  'das/pharmacy',canActivate:[AuthGuardGuard],component:MedicineTableComponent},
    {path:  'das/prescription',canActivate:[AuthGuardGuard],component:PrescriptionTableComponent, data: {
      role: 'doctor'
    }},
    {path:  'das/searchPatient',canActivate:[AuthGuardGuard],component:SearchPatientComponent},
    {path:  'das/account',canActivate:[AuthGuardGuard],component:AccountTableComponent},
    
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
