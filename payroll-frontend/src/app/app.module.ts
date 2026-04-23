import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LeaveComponent } from './components/leave/leave.component';
import { PayrollComponent } from './components/payroll/payroll.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    AttendanceComponent,
    LeaveComponent,
    PayrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     FormsModule,
  HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
