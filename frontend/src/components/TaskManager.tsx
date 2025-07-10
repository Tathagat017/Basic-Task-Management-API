import { useState, useEffect } from "react";
import { Task, CreateTaskRequest } from "../types/task";
import { taskService } from "../services/taskService";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError(
        "Failed to load tasks. Please check if the API server is running."
      );
      console.error("Error loading tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError("Failed to create task. Please try again.");
      console.error("Error creating task:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      setError(null);
      const newStatus = completed ? "completed" : "pending";

      // Optimistically update the UI
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );

      await taskService.toggleTaskCompletion(id, completed);
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Error toggling task completion:", err);
      // Revert the optimistic update
      const revertStatus = completed ? "pending" : "completed";
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: revertStatus } : task
        )
      );
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    const originalTasks = tasks;
    try {
      setError(null);
      // Optimistically remove from UI
      setTasks((prev) => prev.filter((task) => task.id !== id));

      await taskService.deleteTask(id);
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error("Error deleting task:", err);
      // Revert the optimistic update
      setTasks(originalTasks);
    }
  };

  return (
    <div className="task-manager">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Stay organized and get things done!</p>
      </header>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="task-form-container">
        <h2>Create New Task</h2>
        <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
      </div>

      <div className="task-list-container">
        <h2>Your Tasks</h2>
        {isLoading && tasks.length === 0 ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default TaskManager;
