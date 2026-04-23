from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.leave import Leave
from app.schemas.leave import LeaveCreate, LeaveUpdate

router = APIRouter(prefix="/leave")

def get_db():
    db = SessionLocal()
    yield db

@router.post("")
def apply(data: LeaveCreate, db: Session = Depends(get_db)):
    leave = Leave(**data.dict())
    db.add(leave)
    db.commit()
    return leave

@router.get("")
def get_all(db: Session = Depends(get_db)):
    return db.query(Leave).all()

@router.put("/{id}")
def update(id: int, data: LeaveUpdate, db: Session = Depends(get_db)):
    leave = db.query(Leave).get(id)
    leave.status = data.status
    db.commit()
    return leave