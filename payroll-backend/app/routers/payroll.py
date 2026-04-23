from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.services.payroll_service import calculate_salary

router = APIRouter(prefix="/payroll")

def get_db():
    db = SessionLocal()
    yield db

@router.get("/{empId}")
def get_payroll(empId: int, db: Session = Depends(get_db)):

    emp = db.query(Employee).get(empId)

    attendance = db.query(Attendance)\
        .filter(Attendance.employeeId == empId)\
        .all()

    return calculate_salary(emp, attendance)