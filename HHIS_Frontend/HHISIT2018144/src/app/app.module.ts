import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule} from '@angular/common/http';
import { AuthGuardGuard } from './auth-guard.guard';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import { StaffFormComponent } from './Hospital/staffDetails/staff-form/staff-form.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HhisServiceService } from './services/hhis-service.service';
import { StaffComponent } from './Hospital/staffDetails/staff/staff.component';
import { StaffService } from './services/staff.service';
import { ViewStaffDetailsComponent } from './Hospital/staffDetails/view-staff-details/view-staff-details.component';
import { DoctorComponent } from './Hospital/doctorDetails/doctor/doctor.component';
import { DoctorFormComponent } from './Hospital/doctorDetails/doctor-form/doctor-form.component';
import { ViewDoctorDetailsComponent } from './Hospital/doctorDetails/view-doctor-details/view-doctor-details.component';
import { DoctorService } from './services/doctor.service';
import { WardComponent } from './Hospital/wardDetails/ward/ward.component';
import { WardFormComponent } from './Hospital/wardDetails/ward-form/ward-form.component';
import { WardSectionComponent } from './Hospital/wardDetails/ward-section/ward-section.component';
import { WardSectionFormComponent } from './Hospital/wardDetails/ward-section-form/ward-section-form.component';
import { PatientWardDetailsComponent } from './Hospital/wardDetails/patient-ward-details/patient-ward-details.component';
import { LeavePatientWardComponent } from './Hospital/wardDetails/leave-patient-ward/leave-patient-ward.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MadicineExcelFileUploadComponent } from './Hospital/farmacy/madicine-excel-file-upload/madicine-excel-file-upload.component';
import { MedicineTableComponent } from './Hospital/farmacy/medicine-table/medicine-table.component';
import { MedicineFormComponent } from './Hospital/farmacy/medicine-form/medicine-form.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatBadgeModule} from '@angular/material/badge';
import { DoctorPrescriptionComponent } from './Doctor/doctor-prescription/doctor-prescription.component';
import { AccountComponent } from './Hospital/Accounts/account/account.component';
import { AccountTableComponent } from './Hospital/Accounts/account-table/account-table.component';
import { UserRegisterComponent } from './index/user-register/user-register.component';
import { PrescriptionTableComponent } from './Doctor/prescription-table/prescription-table.component';
import { EditDoctorPrescriptionComponent } from './Doctor/edit-doctor-prescription/edit-doctor-prescription.component';
import { NgChartsModule } from 'ng2-charts';
import { ViewMyProfileComponent } from './header/view-my-profile/view-my-profile.component';
import { SearchPatientComponent } from './Doctor/search-patient/search-patient.component';
import { BloodSugarComponent } from './userDetails/blood-sugar/blood-sugar.component';
import { BloodPressureComponent } from './userDetails/blood-pressure/blood-pressure.component';
import { HospitalRegisterFormComponent } from './index/hospital-register-form/hospital-register-form.component';
import {MatSelectModule} from '@angular/material/select';
import { ViewHospitalProfileComponent } from './header/view-hospital-profile/view-hospital-profile.component';
import { SettingComponent } from './header/setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AdminComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    StaffFormComponent,
    StaffComponent,
    ViewStaffDetailsComponent,
    DoctorComponent,
    DoctorFormComponent,
    ViewDoctorDetailsComponent,
    WardComponent,
    WardFormComponent,
    WardSectionComponent,
    WardSectionFormComponent,
    PatientWardDetailsComponent,
    LeavePatientWardComponent,
    MadicineExcelFileUploadComponent,
    MedicineTableComponent,
    MedicineFormComponent,
    DoctorPrescriptionComponent,
    AccountComponent,
    AccountTableComponent,
    UserRegisterComponent,
    PrescriptionTableComponent,
    EditDoctorPrescriptionComponent,
    ViewMyProfileComponent,
    SearchPatientComponent,
    BloodSugarComponent,
    BloodPressureComponent,
    HospitalRegisterFormComponent,
    ViewHospitalProfileComponent,
    SettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    
    // * MATERIAL IMPORTS
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatProgressBarModule,
    MatBadgeModule,
    NgChartsModule,
    MatSelectModule,
    

    
  ],
  providers: [HhisServiceService,StaffService,DoctorService,AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
