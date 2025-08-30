"use client";

import TaskIcon from "./icons/TaskIcon";
import { useTasks } from "@/context/TaskProvider";


export default function TaskStatus() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const isEmpty = totalTasks === 0;

  return (
    <div className="w-full flex flex-col items-center gap-2 mt-8">
      <div className="w-full flex justify-between items-center border-b border-gray-600 py-2 px-4">
        <div className="flex items-center gap-2">
          <span className="text-[#4EA8DE] font-semibold">Tasks:</span>
          <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {totalTasks}
          </span>
        </div>
        <div className="flex items-center gap-2">
  <span className="text-[#8284FA] font-semibold">Completed:</span>
  <span className="bg-gray-800 text-white rounded-full px-2 py-1 flex items-center justify-center text-sm whitespace-nowrap">
    {isEmpty ? 0 : `${completedTasks} out of ${totalTasks}`}
  </span>
</div>

      </div>
      {isEmpty && <TaskIcon />}
    </div>
  );
}
