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
    id: null,
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
    this.employees = res.data; 
  });
}

  openModal() {
    this.isEdit = false;

    this.employee = {
      id: null,
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
  if (!this.employee.name || !this.employee.role || !this.employee.salaryType) {
    alert("All fields are required");
    return;
  }

  if (this.isEdit) {
    this.service.update(this.employee.id, this.employee).subscribe((res: any) => {
      alert(res.message);  
      this.load();
      this.modal.hide();
      this.reset();
    });
  } else {
    this.service.create(this.employee).subscribe((res: any) => {
      alert(res.message);   
      this.load();
      this.modal.hide();
      this.reset();
    });
  }
}

delete(id: number) {
  if (confirm('Are you sure you want to delete?')) {
    this.service.delete(id).subscribe((res: any) => {
      alert(res.message);   
      this.load();
    });
  }
}

  view(emp: any) {
    alert(`
Name: ${emp.name}
Role: ${emp.role}
Salary Type: ${emp.salaryType}
Amount: ₹${emp.salaryAmount}
    `);
  }


  reset() {
    this.employee = {
      id: null,
      name: '',
      role: '',
      salaryType: '',
      salaryAmount: 0
    };
    this.isEdit = false;
  }
}