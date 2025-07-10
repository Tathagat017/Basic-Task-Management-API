import { Task, CreateTaskRequest, UpdateTaskRequest } from "../types/task";

const API_BASE_URL = "http://localhost:8000";

class TaskService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle 204 No Content responses (like DELETE)
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      return await this.request<Task[]>("/tasks");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }

  async createTask(task: CreateTaskRequest): Promise<Task> {
    try {
      return await this.request<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async updateTask(id: number, task: UpdateTaskRequest): Promise<Task> {
    try {
      return await this.request<Task>(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(task),
      });
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.request<void>(`/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  async toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
    const status = completed ? "completed" : "pending";
    return this.updateTask(id, { status });
  }
}

export const taskService = new TaskService();
