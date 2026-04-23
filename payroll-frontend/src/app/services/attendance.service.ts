import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API = 'http://localhost:8000/attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private http: HttpClient) {}

  markAttendance(data: any) {
    return this.http.post(API, data);
  }

  getAttendance(empId: number) {
    return this.http.get(`${API}/${empId}`);
  }
}
