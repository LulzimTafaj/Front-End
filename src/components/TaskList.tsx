"use client";

import TaskCard from "./TaskCard";
import { useTasks } from "@/context/TaskProvider";

export default function TaskList() {
  const { tasks,  } = useTasks();
  return (
    <div className="flex flex-col gap-4 mt-4 w-full">
      {tasks.map(task => (
        <TaskCard key={task.id} id={task.id} />
      ))}
    </div>
  );
}
