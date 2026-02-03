from sqlalchemy import Column, Integer, Date, String
from database import Base

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    steps = Column(Integer)
    calories = Column(Integer)
    workout_minutes = Column(Integer)
    date = Column(Date)

class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    goal_type = Column(String)
    target_value = Column(Integer)
