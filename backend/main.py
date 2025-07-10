from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List

from models import TaskStatus
from schema import TaskCreate, TaskUpdate, TaskResponse
from storage import task_storage

app = FastAPI(title="Task Management API", version="1.0.0")

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/tasks", response_model=List[TaskResponse])
async def get_tasks():
    """Fetch all tasks"""
    tasks = task_storage.get_all_tasks()
    return [TaskResponse(**task.to_dict()) for task in tasks]

@app.post("/tasks", response_model=TaskResponse, status_code=201)
async def create_task(task: TaskCreate):
    """Create a new task"""
    new_task = task_storage.create_task(
        title=task.title,
        description=task.description
    )
    return TaskResponse(**new_task.to_dict())

@app.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(task_id: int, task_update: TaskUpdate):
    """Update an existing task"""
    updated_task = task_storage.update_task(
        task_id=task_id,
        title=task_update.title,
        description=task_update.description,
        status=task_update.status
    )
    
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return TaskResponse(**updated_task.to_dict())

@app.delete("/tasks/{task_id}", status_code=204)
async def delete_task(task_id: int):
    """Delete a task"""
    success = task_storage.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)




