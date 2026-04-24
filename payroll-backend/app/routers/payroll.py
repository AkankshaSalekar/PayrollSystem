from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.services.payroll_service import calculate_salary

router = APIRouter(prefix="/payroll", tags=["Payroll"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# ================= GET ID =================
@router.get("/{empId}")
def get_payroll(empId: int, db: Session = Depends(get_db)):

    emp = db.query(Employee).filter(Employee.id == empId).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    attendance = db.query(Attendance)\
        .filter(Attendance.employeeId == empId)\
        .all()

    result = calculate_salary(emp, attendance)

    return {
        "status": 200,
        "message": "Payroll calculated successfully",
        "data": result
    }