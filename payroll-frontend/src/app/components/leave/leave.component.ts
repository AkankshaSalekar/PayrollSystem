import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeaveService } from 'src/app/services/leave.service';
import { EmployeeService } from 'src/app/services/employee.service';

declare var bootstrap: any;

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit, AfterViewInit {

  leaveList: any[] = [];
  employees: any[] = [];

  modal: any;

  
  role: string = 'admin';  

  leave: any = {
    employeeId: '',
    fromDate: '',
    toDate: ''
  };

  constructor(
    private leaveService: LeaveService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadLeaves();
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('leaveModal');
    this.modal = new bootstrap.Modal(modalElement);
  }


  loadLeaves(): void {
    this.leaveService.getAllLeaves().subscribe({
      next: (res: any) => {
        this.leaveList = res.data;  
      },
      error: (err) => {
        console.error(err);
        alert("Failed to load leaves");
      }
    });
  }

  loadEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (res: any) => {
        this.employees = res.data;
      },
      error: (err) => {
        console.error(err);
        alert("Failed to load employees");
      }
    });
  }


  openModal(): void {
    this.leave = {
      employeeId: '',
      fromDate: '',
      toDate: ''
    };

    this.modal.show();
  }


  apply(): void {
    if (!this.leave.employeeId || !this.leave.fromDate || !this.leave.toDate) {
      alert("All fields are required");
      return;
    }

    this.leaveService.applyLeave(this.leave).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.modal.hide();
        this.loadLeaves();
      },
      error: (err) => {
        console.error(err);
        alert("Failed to apply leave");
      }
    });
  }



  updateStatus(id: number, status: string): void {
    this.leaveService.updateLeave(id, status).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.loadLeaves();
      },
      error: (err) => {
        console.error(err);
        alert("Failed to update leave");
      }
    });
  }


  getEmployeeName(id: number): string {
    const emp = this.employees.find(e => e.id === id);
    return emp ? emp.name : 'Unknown';
  }
}