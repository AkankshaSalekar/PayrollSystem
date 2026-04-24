from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.leave import Leave
from app.schemas.leave import LeaveCreate, LeaveUpdate

router = APIRouter(prefix="/leave", tags=["Leave"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ================= APPLY =================
@router.post("")
def apply(data: LeaveCreate, db: Session = Depends(get_db)):
    leave = Leave(**data.dict())
    db.add(leave)
    db.commit()
    db.refresh(leave)

    return {
        "status": 200,
        "message": "Leave applied successfully",
        "data": leave
    }

# ================= GET ALL =================
@router.get("")
def get_all(db: Session = Depends(get_db)):
    leaves = db.query(Leave).all()

    return {
        "status": 200,
        "message": "Leaves fetched successfully",
        "data": leaves
    }

# ================= UPDATE =================
@router.put("/{id}")
def update(id: int, data: LeaveUpdate, db: Session = Depends(get_db)):
    leave = db.query(Leave).filter(Leave.id == id).first()

    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")

    leave.status = data.status
    db.commit()
    db.refresh(leave)

    return {
        "status": 200,
        "message": f"Leave {data.status} successfully",
        "data": leave
    }