from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate

router = APIRouter(prefix="/employees", tags=["Employee"])

# DB connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ================= CREATE =================
@router.post("")
def create_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    new_emp = Employee(**emp.dict())
    db.add(new_emp)
    db.commit()
    db.refresh(new_emp)

    return {
        "status": 200,
        "message": "Employee created successfully",
        "data": new_emp
    }

# ================= GET ALL =================
@router.get("")
def get_all_employees(db: Session = Depends(get_db)):
    employees = db.query(Employee).all()

    return {
        "status": 200,
        "message": "Employees fetched successfully",
        "data": employees
    }

# ================= GET BY ID =================
@router.get("/{id}")
def get_employee(id: int, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.id == id).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {
        "status": 200,
        "message": "Employee fetched successfully",
        "data": emp
    }

# ================= UPDATE =================
@router.put("/{id}")
def update_employee(id: int, data: EmployeeCreate, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.id == id).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    emp.name = data.name
    emp.role = data.role
    emp.salaryType = data.salaryType
    emp.salaryAmount = data.salaryAmount

    db.commit()
    db.refresh(emp)

    return {
        "status": 200,
        "message": "Employee updated successfully",
        "data": emp
    }

# ================= DELETE =================
@router.delete("/{id}")
def delete_employee(id: int, db: Session = Depends(get_db)):
    emp = db.query(Employee).filter(Employee.id == id).first()

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    db.delete(emp)
    db.commit()

    return {
        "status": 200,
        "message": "Employee deleted successfully"
    }