from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceCreate
from datetime import date

router = APIRouter(prefix="/attendance", tags=["Attendance"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ================= CREATE =================
@router.post("")
def mark(data: AttendanceCreate, db: Session = Depends(get_db)):
    att = Attendance(**data.dict())
    db.add(att)
    db.commit()
    db.refresh(att)

    return {
        "status": 200,
        "message": "Attendance marked successfully",
        "data": att
    }

# ================= TODAY ATTENDANCE =================
@router.get("/today")   # ✅ MUST COME FIRST
def get_today_attendance(db: Session = Depends(get_db)):
    today = str(date.today())

    records = db.query(Attendance)\
        .filter(Attendance.date == today)\
        .all()

    return {
        "status": 200,
        "message": "Today's attendance fetched",
        "data": records
    }

# ================= GET BY EMPLOYEE =================
@router.get("/{empId}")   # ✅ MUST COME AFTER
def get(empId: int, db: Session = Depends(get_db)):
    records = db.query(Attendance)\
        .filter(Attendance.employeeId == empId)\
        .all()

    return {
        "status": 200,
        "message": "Attendance fetched successfully",
        "data": records
    }