import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const TaskItem = ({
  task,
  onToggleComplete,
  onDelete,
  isLoading = false,
}: TaskItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isCompleted = task.status === "completed";

  return (
    <div className={`task-item ${isCompleted ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-actions">
            <button
              className={`toggle-btn ${
                isCompleted ? "complete" : "incomplete"
              }`}
              onClick={() => onToggleComplete(task.id, !isCompleted)}
              disabled={isLoading}
            >
              {isCompleted ? "✓" : "○"}
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(task.id)}
              disabled={isLoading}
            >
              🗑️
            </button>
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          <span className="status-badge">{task.status.toUpperCase()}</span>

          <span className="created-date">
            Created: {formatDate(task.created_at)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
