import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LeaveComponent } from './components/leave/leave.component';
import { PayrollComponent } from './components/payroll/payroll.component';

const routes: Routes = [
    { path: 'employees', component: EmployeeComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'payroll', component: PayrollComponent },
  { path: '', redirectTo: 'employees', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
