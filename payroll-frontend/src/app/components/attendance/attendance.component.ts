import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeeService } from 'src/app/services/employee.service';

declare var bootstrap: any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements AfterViewInit, OnInit {

  attendanceList: any[] = [];
  employees: any[] = [];  
  modal: any;
todayList: any[] = [];
  searchEmployeeId: number = 0;
showToday = true;
showSearch = false;
  attendance: any = {
    employeeId: '',
    date: '',
    status: ''
  };

  constructor(
    private service: AttendanceService,
    private empService: EmployeeService   
  ) {}

  ngOnInit() {
    this.loadEmployees(); 
     this.getTodayAttendance();   
  }

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(document.getElementById('attendanceModal'));
  }


  loadEmployees() {
    this.empService.getAll().subscribe((res: any) => {
      this.employees = res.data;  
    });
  }

  openModal() {
    this.attendance = {
      employeeId: '',
      date: '',
      status: ''
    };
    this.modal.show();
  }
getTodayAttendance() {
  this.service.getTodayAttendance().subscribe((res: any) => {
    this.todayList = res.data;

    this.showToday = true;
    this.showSearch = false;
  });
}


getEmployeeName(id: number): string {
  const emp = this.employees.find((e: any) => e.id === id);
  return emp ? emp.name : 'Unknown';
}
save() {
  if (!this.attendance.employeeId || !this.attendance.date || !this.attendance.status) {
    alert("All fields are required");
    return;
  }

  this.service.markAttendance(this.attendance).subscribe((res: any) => {
    alert(res.message);
    this.modal.hide();

    this.getTodayAttendance();   // refresh today
  });
}


getAttendance() {
  if (!this.searchEmployeeId) {
    alert("Enter Employee ID");
    return;
  }

  this.service.getAttendance(this.searchEmployeeId).subscribe((res: any) => {
    this.attendanceList = res.data;

    this.showSearch = true;   // show search table
    this.showToday = false;   // hide today table
  });
}
}