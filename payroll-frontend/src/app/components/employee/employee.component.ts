import { Component, AfterViewInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

declare var bootstrap: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements AfterViewInit {

  employees: any[] = [];
  modal: any;

  employee: any = {
    name: '',
    role: '',
    salaryType: '',
    salaryAmount: 0
  };

  isEdit = false;

  constructor(private service: EmployeeService) {}

  ngOnInit() {
    this.load();
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('employeeModal');
    this.modal = new bootstrap.Modal(modalElement);
  }

  load() {
    this.service.getAll().subscribe((res: any) => {
      this.employees = res;
    });
  }

  openModal() {
    this.isEdit = false;

    this.employee = {
      name: '',
      role: '',
      salaryType: '',
      salaryAmount: 0
    };

    this.modal.show();
  }

  edit(emp: any) {
    this.isEdit = true;
    this.employee = { ...emp };
    this.modal.show();
  }

  save() {
    if (this.isEdit) {
      // this.service.update(this.employee.id, this.employee).subscribe(() => {
      //   this.load();
      //   this.modal.hide();
      // });
    } else {
      this.service.create(this.employee).subscribe(() => {
        this.load();
        this.modal.hide();
      });
    }
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      // this.service.delete(id).subscribe(() => {
      //   this.load();
      // });
    }
  }

  view(emp: any) {
    alert(JSON.stringify(emp));
  }
}