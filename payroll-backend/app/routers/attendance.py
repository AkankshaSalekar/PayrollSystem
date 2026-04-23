from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceCreate

router = APIRouter(prefix="/attendance")

def get_db():
    db = SessionLocal()
    yield db

@router.post("")
def mark(data: AttendanceCreate, db: Session = Depends(get_db)):
    att = Attendance(**data.dict())
    db.add(att)
    db.commit()
    return att

@router.get("/{empId}")
def get(empId: int, db: Session = Depends(get_db)):
    return db.query(Attendance)\
        .filter(Attendance.employeeId == empId)\
        .all()