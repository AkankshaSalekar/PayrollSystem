from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ✅ Railway MySQL URL (IMPORTANT CHANGE)
DATABASE_URL = "mysql+pymysql://root:XmOemfvCkVInVbXZcVejbRnThoWLgigR@shortline.proxy.rlwy.net:41725/railway"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()