import { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const TaskList = ({
  tasks,
  onToggleComplete,
  onDelete,
  isLoading = false,
}: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  // Sort tasks: incomplete first, then by creation date (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    // First, sort by completion status (pending first)
    if (a.status !== b.status) {
      return a.status === "completed" ? 1 : -1;
    }

    // Then by creation date (newest first)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const completedTasks = sortedTasks.filter(
    (task) => task.status === "completed"
  );
  const incompleteTasks = sortedTasks.filter(
    (task) => task.status === "pending"
  );

  return (
    <div className="task-list">
      <div className="task-stats">
        <span className="task-count">
          {incompleteTasks.length} of {tasks.length} tasks remaining
        </span>
      </div>

      {incompleteTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">Active Tasks</h3>
          {incompleteTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h3 className="section-title">Completed Tasks</h3>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
