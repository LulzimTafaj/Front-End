"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/context/TaskProvider";
import { Task } from "@/types/task.types";

export default function TaskPage() {
  const params = useParams();
  const { tasks, fetchTasks } = useTasks();

  const [task, setTask] = useState<Task | null>(null);

  const id = Number(params?.id);

  useEffect(() => {
    if (isNaN(id)) return;

    let found = tasks.find((t) => t.id === id);
    if (found) {
      setTask(found);
    } else {
      fetchTasks().then(() => {
        found = tasks.find((t) => t.id === id);
        if (found) setTask(found);
      });
    }
  }, [id, tasks, fetchTasks]);

  if (isNaN(id)) {
    return <p className="text-red-500">Invalid task id</p>;
  }

  if (!task) {
    return <p className="text-gray-500">Loading task...</p>;
  }

  return (
    <TaskForm
      taskId={task.id}
      initialTitle={task.title}
      initialColor={task.color}
    />
  );
}
