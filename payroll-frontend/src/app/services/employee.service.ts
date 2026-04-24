import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'https://payrollsystem-6wam.onrender.com/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(API);
  }

  getById(id: number) {
    return this.http.get(`${API}/${id}`);
  }

  create(data: any) {
    return this.http.post(API, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${API}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${API}/${id}`);
  }
}
