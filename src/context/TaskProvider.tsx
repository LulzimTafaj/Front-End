"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";
import { Task } from "@/types/task.types";

interface TasksContextProps {
  tasks: Task[];
  toggleTask: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks(); // ensure cache: "no-store" in api
      setTasks(data.filter(task => task && task.id != null));
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      await api.toggleTask(id, !task.completed);
    } catch (error) {
      console.error(error);
      setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, completed: task.completed } : t))
      );
    }
  };

  const deleteTask = async (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));

    try {
      await api.deleteTask(id);
    } catch (error) {
      console.error(error);
      await fetchTasks();
    }
  };

  return (
    <TasksContext.Provider value={{ tasks, toggleTask, deleteTask, fetchTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within a TasksProvider");
  return context;
};
