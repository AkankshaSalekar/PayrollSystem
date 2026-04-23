import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:8000/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(API);
  }

  create(data: any) {
    return this.http.post(API, data);
  }
}
