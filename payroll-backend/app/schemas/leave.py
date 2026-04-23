from pydantic import BaseModel

class LeaveCreate(BaseModel):
    employeeId: int
    fromDate: str
    toDate: str

class LeaveUpdate(BaseModel):
    status: str