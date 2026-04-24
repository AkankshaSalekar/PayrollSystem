from sqlalchemy import Column, Integer, String
from app.database import Base

class Leave(Base):
    __tablename__ = "leaves"

    id = Column(Integer, primary_key=True)
    employeeId = Column(Integer)
    fromDate = Column(String(20))   
    toDate = Column(String(20))     
    status = Column(String(20), default="Pending") 