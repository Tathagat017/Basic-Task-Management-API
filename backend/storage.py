from typing import Dict, List, Optional
from models import Task, TaskStatus

class TaskStorage:
    def __init__(self):
        self._tasks: Dict[int, Task] = {}
        self._next_id = 1
    
    def create_task(self, title: str, description: Optional[str] = None) -> Task:
        task = Task(
            id=self._next_id,
            title=title,
            description=description
        )
        self._tasks[self._next_id] = task
        self._next_id += 1
        return task
    
    def get_all_tasks(self) -> List[Task]:
        return list(self._tasks.values())
    
    def get_task(self, task_id: int) -> Optional[Task]:
        return self._tasks.get(task_id)
    
    def update_task(self, task_id: int, title: Optional[str] = None, 
                   description: Optional[str] = None, status: Optional[TaskStatus] = None) -> Optional[Task]:
        task = self._tasks.get(task_id)
        if task:
            task.update(title=title, description=description, status=status)
        return task
    
    def delete_task(self, task_id: int) -> bool:
        if task_id in self._tasks:
            del self._tasks[task_id]
            return True
        return False

# Global storage instance
task_storage = TaskStorage()
