from fastapi import FastAPI
from app.database import engine, Base


from app.models import employee, attendance, leave  

from app.routers import employee as employee_router
from app.routers import attendance as attendance_router
from app.routers import leave as leave_router
from app.routers import payroll as payroll_router

from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(employee_router.router)
app.include_router(attendance_router.router)
app.include_router(leave_router.router)
app.include_router(payroll_router.router)