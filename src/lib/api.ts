import { CreateTaskInput, UpdateTaskInput, Task, TaskCount } from "../types/task.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"; 

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `API error ${res.status}: ${res.statusText} - ${errorText}`
    );
  }

  if (res.status === 204) return null as unknown as T;

  return res.json();
}

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const res = await request<{ tasks: Task[]; summary: TaskCount }>("/tasks");

    return res.tasks.map(task => ({
      ...task,
      completed: Boolean(task.completed),
    }));
  },

  getTask: (id: number): Promise<Task> => request(`/tasks/${id}`),

  createTask: (data: CreateTaskInput): Promise<Task> =>
    request("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateTask: (id: number, data: UpdateTaskInput): Promise<Task> =>
    request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteTask: (id: number): Promise<{ message: string } | null> =>
    request(`/tasks/${id}`, {
      method: "DELETE",
    }),

  toggleTask: (id: number, completed: boolean): Promise<Task> =>
    request(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed }),
    }),
};
