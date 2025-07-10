from enum import Enum
from datetime import datetime
from typing import Optional

class TaskStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"

class Task:
    def __init__(
        self, 
        id: int, 
        title: str, 
        description: Optional[str] = None,
        status: TaskStatus = TaskStatus.PENDING,
        created_at: Optional[datetime] = None
    ):
        self.id = id
        self.title = title
        self.description = description
        self.status = status
        self.created_at = created_at or datetime.now()
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status.value,
            "created_at": self.created_at.isoformat()
        }
    
    def update(self, title: Optional[str] = None, description: Optional[str] = None, status: Optional[TaskStatus] = None):
        if title is not None:
            self.title = title
        if description is not None:
            self.description = description
        if status is not None:
            self.status = status
