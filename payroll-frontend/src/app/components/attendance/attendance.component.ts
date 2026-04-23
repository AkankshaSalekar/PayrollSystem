import { Component, AfterViewInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';

declare var bootstrap: any;

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements AfterViewInit {

  attendanceList: any[] = [];
  modal: any;

  searchEmployeeId: number = 0;

  attendance: any = {
    employeeId: '',
    date: '',
    status: ''
  };

  constructor(private service: AttendanceService) {}

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(document.getElementById('attendanceModal'));
  }

  openModal() {
    this.attendance = {
      employeeId: '',
      date: '',
      status: ''
    };
    this.modal.show();
  }

  save() {
    this.service.markAttendance(this.attendance).subscribe(() => {
      this.modal.hide();
      this.getAttendance();
    });
  }

  getAttendance() {
    this.service.getAttendance(this.searchEmployeeId).subscribe((res: any) => {
      this.attendanceList = res;
    });
  }
}