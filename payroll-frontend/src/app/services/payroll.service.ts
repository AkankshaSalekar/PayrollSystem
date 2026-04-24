import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:8000/payroll';

@Injectable({ providedIn: 'root' })
export class PayrollService {

  constructor(private http: HttpClient) {}

 getPayroll(empId: number) {
  return this.http.get<any>(`${API}/${empId}`);
}
}