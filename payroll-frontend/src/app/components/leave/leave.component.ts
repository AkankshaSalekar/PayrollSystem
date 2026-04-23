import { Component, AfterViewInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements AfterViewInit {

  leaveList: any[] = [];
  modal: any;

  // change role here for testing
  role: string = 'admin'; // 'employee' or 'admin'

  leave: any = {
    employeeId: '',
    fromDate: '',
    toDate: ''
  };

  constructor(private service: LeaveService) {}

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(document.getElementById('leaveModal'));
  }

  ngOnInit() {
    this.loadLeaves();
  }

  loadLeaves() {
    this.service.getAllLeaves().subscribe((res: any) => {
      this.leaveList = res;
    });
  }

  openModal() {
    this.leave = {
      employeeId: '',
      fromDate: '',
      toDate: ''
    };
    this.modal.show();
  }

  apply() {
    this.service.applyLeave(this.leave).subscribe(() => {
      this.modal.hide();
      this.loadLeaves();
    });
  }

  updateStatus(id: number, status: string) {
    this.service.updateLeave(id, status).subscribe(() => {
      this.loadLeaves();
    });
  }
}