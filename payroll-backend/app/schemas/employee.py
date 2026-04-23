from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    name: str
    role: str
    salaryType: str
    salaryAmount: int