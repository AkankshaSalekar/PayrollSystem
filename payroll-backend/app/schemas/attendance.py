from pydantic import BaseModel

class AttendanceCreate(BaseModel):
    employeeId: int
    date: str
    status: str