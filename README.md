
# Payroll System (Full Stack)

A mini full-stack application to manage employees, attendance, leave, and payroll.
This project demonstrates a real-world SaaS-style architecture using Angular, FastAPI, and MySQL.

# Table of Contents
 -- Live URLs
 -- Tech Stack
 -- System Architecture
 -- Database Schema & Entity Relationships
 -- Project Structure
 -- Local Setup Instructions
 -- MySQL Database Commands
 -- Backend Setup
 -- Frontend Setup
 -- API Endpoints
 -- Core Payroll Logic
 -- Architecture Decisions
 -- Assumptions
 -- Environment Variables
 -- Deployment Guide

# Live URLs

| Service   | URL                                              |
|-----------|--------------------------------------------------|
| Frontend  | `https://payroll-system-flax-zeta.vercel.app`    |
| Backend   | `https://payrollsystem-6wam.onrender.com`        |
| API Docs  | `https://payrollsystem-6wam.onrender.com/docs`   |

# Tech Stack

| Layer      | Technology                                 |
|------------|--------------------------------------------|
| Backend    | Python 3.11, FastAPI, SQLAlchemy           |
| Frontend   | Angular 16, Angular Material ,Bootstrap    |
| Database   | MySQL 8.0                                  |
| ORM        | SQLAlchemy + PyMySQL                       |
| Deployment | Railway / Render / EC2 + Vercel            |

#  System Architecture

Angular (Frontend - Vercel)
             |
             ↓ HTTP/REST (JSON)
REST API FastAPI (Backend - Render) 
             |
             ↓ SQLAlchemy ORM Layer        
MySQL (Database - Railway)


# Database Schema & Entity Relationships

# Entities

Employee
Attendance
Leave
Payroll

---

# Relationships

* One Employee → Many Attendance records
* One Employee → Many Leave records
* One Employee → One Payroll record

---

# Entity Relationship Diagram (Simple)

Employee (1) ──────────── (*) Attendance
Employee (1) ──────────── (*) Leave
Employee (1) ──────────── (1) Payroll

---

# Table: `employees`

| Column       | Type         | Description     |
| ------------ | ------------ | --------------- |
| id           | Integer (PK) | Employee ID     |
| name         | String       | Employee Name   |
| role         | String       | Job Role        |
| salaryType   | String       | Monthly / Daily |
| salaryAmount | Integer      | Base Salary     |

---

# Table: `attendance`

| Column     | Type         | Description      |
| ---------- | ------------ | ---------------- |
| id         | Integer (PK) | Attendance ID    |
| employeeId | Integer (FK) | Linked Employee  |
| date       | String       | Attendance Date  |
| status     | String       | Present / Absent |

---

# Table: `leaves`

| Column     | Type         | Description        |
| ---------- | ------------ | ------------------ |
| id         | Integer (PK) | Leave ID           |
| employeeId | Integer (FK) | Linked Employee    |
| fromDate   | String       | Start Date         |
| toDate     | String       | End Date           |
| status     | String       | Pending / Approved |

---

# Table: `payroll`

| Column      | Type         | Description          |
| ----------- | ------------ | -------------------- |
| id          | Integer (PK) | Payroll ID           |
| employeeId  | Integer (FK) | Linked Employee      |
| totalSalary | Integer      | Final Salary         |
| deductions  | Integer      | Salary Deductions    |
| netSalary   | Integer      | Final Payable Salary |

---

# Notes

* Each attendance record is linked to one employee
* Leave records track employee absence
* Payroll is generated per employee
* Salary is calculated based on attendance and leaves

---

# Project Structure

```plaintext
PayrollSystem/
│
├── payroll-backend/                # FastAPI Backend
│   ├── app/
│   │   ├── __pycache__/
│   │   │
│   │   ├── models/                # Database Models
│   │   │   ├── attendance.py
│   │   │   ├── employee.py
│   │   │   └── leave.py
│   │   │
│   │   ├── routers/               # API Routes
│   │   │   ├── attendance.py
│   │   │   ├── employee.py
│   │   │   ├── leave.py
│   │   │   └── payroll.py
│   │   │
│   │   ├── schemas/               # Pydantic Schemas
│   │   │   ├── attendance.py
│   │   │   ├── employee.py
│   │   │   └── leave.py
│   │   │
│   │   ├── services/              # Business Logic (optional layer)
│   │   │
│   │   ├── database.py            # Database Connection
│   │   └── main.py                # FastAPI Entry Point
│   │
│   ├── venv/                      # Virtual Environment
│   ├── payroll.db                 # Local Database (if used)
│   └── requirements.txt           # Dependencies
│
├── payroll-frontend/              # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # UI Components
│   │   │   │   ├── attendance/
│   │   │   │   ├── employee/
│   │   │   │   ├── leave/
│   │   │   │   └── payroll/
│   │   │   │
│   │   │   ├── models/            # TypeScript Models
│   │   │   ├── services/          # API Services
│   │   │   │   ├── attendance.service.ts
│   │   │   │   ├── employee.service.ts
│   │   │   │   ├── leave.service.ts
│   │   │   │   └── payroll.service.ts
│   │   │   │
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.component.html
│   │   │   └── app.module.ts
│   │   │
│   │   └── assets/
│   │
│   ├── angular.json
│   ├── package.json
│   └── node_modules/
│
├── README.md                      # Project Documentation
│
└── .gitignore
```

---

# Structure Explanation

# Backend (`payroll-backend`)

models  → Database tables (SQLAlchemy)
routers → API endpoints
schemas → Request/Response validation
services → Business logic layer
database.py → DB connection
main.py  → App entry point

---

# Frontend (`payroll-frontend`)

components → UI pages (Employee, Attendance, etc.)
services → API integration (calls backend)
models → Data structures
app.module.ts → Main Angular module
app-routing.module.ts → Routing

---
# Local Setup Instructions

## Database

```sql
CREATE DATABASE payroll_db;
```

---

# Backend (FastAPI)

```bash
cd payroll-backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

 API: http://127.0.0.1:8000/docs

---

# Frontend (Angular)

```bash
cd payroll-frontend
npm install
ng serve
```
App: http://localhost:4200

---

# Environment

Backend:

```env
DATABASE_URL=mysql+pymysql://username:password@localhost:3306/payroll_db
```

Frontend:

```typescript
apiUrl: 'http://127.0.0.1:8000'
```

---

#  API Endpoints

# Base URL

```
https://payrollsystem-6wam.onrender.com
```

---

# Employee APIs

| Method | Endpoint        | Access | Description        |
| ------ | --------------- | ------ | ------------------ |
| GET    | /employees      | Public | Get all employees  |
| GET    | /employees/{id} | Public | Get employee by ID |
| POST   | /employees      | Admin  | Create employee    |
| PUT    | /employees/{id} | Admin  | Update employee    |
| DELETE | /employees/{id} | Admin  | Delete employee    |

---

# Attendance APIs

| Method | Endpoint            | Access   | Description             |
| ------ | ------------------- | -------- | ----------------------- |
| POST   | /attendance         | Employee | Mark attendance         |
| GET    | /attendance/{empId} | Employee | Get employee attendance |
| GET    | /attendance/today   | Admin    | Get today attendance    |

---

# Leave APIs

| Method | Endpoint    | Access   | Description            |
| ------ | ----------- | -------- | ---------------------- |
| POST   | /leave      | Employee | Apply leave            |
| GET    | /leave      | Admin    | Get all leave requests |
| PUT    | /leave/{id} | Admin    | Update leave status    |

---

# Payroll APIs

| Method | Endpoint         | Access | Description         |
| ------ | ---------------- | ------ | ------------------- |
| GET    | /payroll/{empId} | Admin  | Get payroll details |

---

# Query Parameters

| Endpoint            | Params       | Description |
| ------------------- | ------------ | ----------- |
| /attendance/{empId} | empId (path) | Employee ID |
| /employees/{id}     | id (path)    | Employee ID |
| /payroll/{empId}    | empId (path) | Employee ID |

---

# Request Examples

---

# Create Employee Request

# Endpoint

```
POST /employees
```

# Body

```json
{
  "name": "John Doe",
  "role": "Developer",
  "salaryType": "Monthly",
  "salaryAmount": 50000
}
```

---

# Mark Attendance Request

# Endpoint

```
POST /attendance
```

# Body

```json
{
  "employeeId": 1,
  "date": "2026-04-24",
  "status": "Present"
}
```

---

# Apply Leave Request

# Endpoint

```
POST /leave
```

# Body

```json
{
  "employeeId": 1,
  "fromDate": "2026-04-25",
  "toDate": "2026-04-27",
  "status": "Pending"
}
```

---

# Generate Payroll Request

*(Auto-calculated based on attendance & salary)*

### Endpoint

```
GET /payroll/{empId}
```

# Example

```
GET /payroll/1
```

---

# Notes

* All APIs return JSON responses
* Employee ID is required for most operations
* Payroll is generated dynamically
* Dates should be in `YYYY-MM-DD` format

---

# Core Payroll Logic

* Salary is calculated based on employee type:

  * **Monthly** → Fixed salary
  * **Daily** → Based on attendance
* Deductions applied for:

  * Absent days
  * Leave (if unpaid)
* Final calculation:

```id="logic2"
Net Salary = Base Salary - Deductions
```

---

# Architecture Decisions

* **FastAPI** → High performance, simple API design
* **Angular** → Structured frontend with reusable components
* **MySQL** → Relational database for structured data
* **REST API** → Easy frontend-backend integration
* **Modular structure** → Separate models, routers, services

---

# Assumptions

* One payroll is generated per employee
* Attendance is marked daily
* Leave affects salary calculation
* Employee ID is used as reference across all modules

---

# Environment Variables

### Backend

```env id="env3"
DATABASE_URL=mysql+pymysql://username:password@host:port/database
```

---

# Frontend

```typescript id="env4"
apiUrl: 'https://payrollsystem-6wam.onrender.com'
```

---

# Deployment Guide

### 🔹 Backend (Render)

* Root Directory: `payroll-backend`
* Build Command:

```id="dep1"
pip install -r requirements.txt
```

* Start Command:

```id="dep2"
uvicorn app.main:app --host 0.0.0.0 --port 10000
```

---

# Frontend (Vercel)

* Root Directory: `payroll-frontend`
* Install Command:

```id="dep3"
npm install
```

* Build Command:

```id="dep4"
ng build
```

* Output Directory:

```id="dep5"
dist/payroll-frontend
```

---

# Database

* Hosted on **Railway (MySQL)**
* Connected using `DATABASE_URL`

---

# Final Deployment

* Frontend → Vercel
* Backend → Render
* Database → Railway

---
