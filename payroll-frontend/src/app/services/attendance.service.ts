import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API = 'https://payrollsystem-6wam.onrender.com/attendance';

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

  getTodayAttendance() {
  return this.http.get(`${API}/today`);
}
}
