import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:8000/leave';

@Injectable({ providedIn: 'root' })
export class LeaveService {

  constructor(private http: HttpClient) {}

  applyLeave(data: any) {
    return this.http.post(API, data);
  }

  updateLeave(id: number, status: string) {
    return this.http.put(`${API}/${id}`, { status });
  }

  getAllLeaves() {
    return this.http.get(API);
  }
}