from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Activity, Base
from schemas import ActivityCreate, GoalCreate
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse


Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount("/static", StaticFiles(directory="frontend"), name="static")

@app.get("/app")
def serve_frontend():
    return FileResponse("frontend/index.html")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Fitness Tracker API is running"}

@app.post("/activity")
def add_activity(activity: ActivityCreate, db: Session = Depends(get_db)):
    db_activity = Activity(**activity.dict())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return {"status": "Activity saved"}

@app.get("/activity")
def get_activities(db: Session = Depends(get_db)):
    return db.query(Activity).all()

@app.post("/goal")
def set_goal(goal: GoalCreate, db: Session = Depends(get_db)):
    db_goal = Goal(**goal.dict())
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return {"status": "Goal saved"}

@app.get("/goal")
def get_goals(db: Session = Depends(get_db)):
    return db.query(Goal).all()



@app.get("/progress/{goal_type}")
def goal_progress(goal_type: str, db: Session = Depends(get_db)):
    goal = db.query(Goal).filter(Goal.goal_type == goal_type).first()
    if not goal:
        return {"error": "Goal not found"}

    if goal_type == "steps":
        total = sum(a.steps for a in db.query(Activity).all())
    elif goal_type == "workouts":
        total = sum(a.workout_minutes for a in db.query(Activity).all())
    else:
        return {"error": "Invalid goal type"}

    percent = min((total / goal.target_value) * 100, 100)

    return {
        "goal": goal.target_value,
        "current": total,
        "progress": round(percent, 2)
    }
