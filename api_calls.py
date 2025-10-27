from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

# -----------------------------
# Load the trained pipeline
# -----------------------------
model = joblib.load('tech_assignment_model.pkl')

historical_tasks = pd.read_csv('historical_tasks.csv') 
technician_data = pd.read_csv('technicians.csv')   
unassigned_tasks = pd.read_csv('unassigned_tasks.csv') 

# -----------------------------
# Define input schema
# -----------------------------
class TaskInput(BaseModel):
    task_distance: float
    task_priority: int
    task_complexity: int
    equipment_required: int

class NewTask(BaseModel):
    task_id: str
    task_distance: float
    task_priority: int
    task_complexity: int
    equipment_required: int
    customer_rating: float = 0.0
    penalty_cost: float = 0.0
# -----------------------------
# Initialize FastAPI
# -----------------------------
app = FastAPI(title="Task Completion Prediction API")

# -----------------------------
# Define prediction endpoint
# -----------------------------
@app.post("/assign_task")
def assign_task(input: TaskInput):

    train = historical_tasks.merge(technician_data, on='Technician ID', how='left')

    # Expertise Match = 1 if (equipment OK) AND (tech qualified)
    train['Expertise Match'] = (
        ((train['Equipment Required'] == 0) | (train['Eqpt Trained'] == 1)) &
        (train['Tech Complexity'] >= train['Task Complexity'])
    ).astype(int)

    # How much harder/easier the task is compared to tech skill
    train['complexity_gap'] = train['Tech Complexity'] - train['Task Complexity']

    tech_stats = historical_tasks.groupby('Technician ID').agg(
        completion_rate=('Task Completed', 'mean'),
        avg_customer_rating=('Customer Rating', 'mean'),
        avg_penalty_cost=('Penalty Cost', 'mean'),
        expertise_rate=('Expertise Match', 'mean'),
        num_tasks=('Task ID', 'count')
    ).reset_index()

    # Create a DataFrame with one row per tech (all candidate techs)
    candidates = technician_data.copy()
    candidates['Task Distance'] = input.task_distance
    candidates['Task Priority'] = input.task_priority
    candidates['Task Complexity'] = input.task_complexity
    candidates['Equipment Required'] = input.equipment_required

    # Merge historical stats
    candidates = candidates.merge(tech_stats, on='Technician ID', how='left')

    # Compute derived features
    candidates['Expertise Match'] = ((candidates['Equipment Required'] == 0) | (candidates['Eqpt Trained'] == 1)) & \
                                     (candidates['Tech Complexity'] >= candidates['Task Complexity'])
    candidates['Expertise Match'] = candidates['Expertise Match'].astype(int)
    candidates['complexity_gap'] = candidates['Tech Complexity'] - candidates['Task Complexity']

    # Select model feature columns
    feature_cols = [
        'Technician ID', 'Task Distance', 'Task Priority', 'Task Complexity', 'Equipment Required',
        'Tech Complexity', 'Eqpt Trained', 'Expertise Match', 'complexity_gap',
        'completion_rate', 'avg_customer_rating', 'avg_penalty_cost', 'expertise_rate'
    ]
    X_new = candidates[feature_cols]

    # Predict probabilities
    candidates['completion_prob'] = model.predict_proba(X_new)[:, 1]

    # Pick the best tech
    best_row = candidates.loc[candidates['completion_prob'].idxmax()]

    return {
        "technician_id": best_row['Technician ID'],
        "completion_probability": float(best_row['completion_prob'])
    }

# -----------------------------
# Endpoint: view tasks by technician
# -----------------------------
@app.get("/tasks/{tech_id}")
def view_tasks(tech_id: str):
    tasks = historical_tasks[historical_tasks['Technician ID'] == tech_id]
    return tasks.to_dict(orient="records")

# -----------------------------
# Endpoint: add a new task
# -----------------------------
@app.post("/tasks/add")
def add_task(task: NewTask):
    global unassigned_tasks
    unassigned_tasks = pd.concat([unassigned_tasks, pd.DataFrame([task.dict()])], ignore_index=True)
    return {"message": f"Task {task.task_id} added to unassigned tasks."}

# -----------------------------
# Endpoint: view all unassigned tasks
# -----------------------------
@app.get("/tasks/unassigned")
def view_unassigned_tasks():
    return "Hello World"