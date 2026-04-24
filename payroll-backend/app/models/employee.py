from sqlalchemy import Column, Integer, String
from app.database import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))       
    role = Column(String(50))         
    salaryType = Column(String(50))    
    salaryAmount = Column(Integer)