import { Component } from '@angular/core';
import { PayrollService } from 'src/app/services/payroll.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent {

  employeeId: number = 0;
  payroll: any = null;
  payrollHistory: any[] = [];

  constructor(private service: PayrollService) {}

  getPayroll() {
    if (!this.employeeId) {
      alert('Enter Employee ID');
      return;
    }

    this.service.getPayroll(this.employeeId).subscribe((res: any) => {
      this.payroll = res;

      // store history
      this.payrollHistory.push({
        employeeId: this.employeeId,
        ...res
      });
    });
  }
}