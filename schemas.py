from pydantic import BaseModel
from datetime import date

class ActivityCreate(BaseModel):
    steps: int
    calories: int
    workout_minutes: int
    date: date
class GoalCreate(BaseModel):
    goal_type: str
    target_value: int
