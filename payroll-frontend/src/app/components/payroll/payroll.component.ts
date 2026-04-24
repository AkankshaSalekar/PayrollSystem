import { Component, OnInit } from '@angular/core';
import { PayrollService } from 'src/app/services/payroll.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {

  employeeId: number = 0;
  payroll: any = null;
  payrollHistory: any[] = [];
  employees: any[] = [];

  constructor(
    private service: PayrollService,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // ================= LOAD EMPLOYEES =================
  loadEmployees() {
    this.empService.getAll().subscribe((res: any) => {
      this.employees = res.data;
    });
  }

  // ================= GET PAYROLL =================
  getPayroll() {
    if (!this.employeeId) {
      alert('Select Employee');
      return;
    }

    this.service.getPayroll(this.employeeId).subscribe({
      next: (res: any) => {

        this.payroll = res.data;   // ✅ FIX

        this.payrollHistory.push({
          employeeId: this.employeeId,
          ...res.data
        });

      },
      error: (err) => {
        console.error(err);
        alert("Failed to fetch payroll");
      }
    });
  }

  // ================= HELPER =================
  getEmployeeName(id: number): string {
    const emp = this.employees.find(e => e.id === id);
    return emp ? emp.name : 'Unknown';
  }
}