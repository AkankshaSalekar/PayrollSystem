from sqlalchemy import Column, Integer, String
from app.database import Base

class Leave(Base):
    __tablename__ = "leave"

    id = Column(Integer, primary_key=True)
    employeeId = Column(Integer)
    fromDate = Column(String)
    toDate = Column(String)
    status = Column(String, default="Pending")