from fastapi import FastAPI
from app.database import Base, engine
from app.routers import employee, attendance, leave, payroll
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (Angular connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(employee.router)
app.include_router(attendance.router)
app.include_router(leave.router)
app.include_router(payroll.router)