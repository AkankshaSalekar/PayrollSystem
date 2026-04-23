from sqlalchemy import Column, Integer, String
from app.database import Base

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True)
    employeeId = Column(Integer)
    date = Column(String)
    status = Column(String)