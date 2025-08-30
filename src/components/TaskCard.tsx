"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <- import router
import ConfirmationModal from "./ConfirmationModal";
import { useTasks } from "@/context/TaskProvider";

interface TaskCardProps {
  id: number;
}

export default function TaskCard({ id }: TaskCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks, toggleTask, deleteTask } = useTasks();
  const router = useRouter(); // <- initialize router

  const task = tasks.find(t => t.id === id);
  if (!task) return null;

  return (
    <>
      <div
        className={`w-full sm:w-96 md:w-[500px] lg:w-[700px] flex items-center justify-between px-4 py-6 rounded-2xl shadow-lg mt-2 transition-all 
        ${task.completed ? "bg-[#262626] opacity-50" : "bg-[#262626]"}`}
      >
        <button
          onClick={() => toggleTask(task.id)}
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 transition cursor-pointer
          ${task.completed ? "bg-purple-500 border-purple-500" : "border-blue-400"}`}
        >
          {task.completed && <span className="text-white text-xs">✔</span>}
        </button>

        <p
          onClick={() => router.push(`/tasks/${task.id}`)}
          className={`flex-1 text-gray-200 text-xl cursor-pointer ${task.completed ? "line-through" : ""}`}
        >
          {task.title || "Untitled Task"}
        </p>

        <button className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <span className="text-gray-400 hover:text-red-500 transition">🗑️</span>
        </button>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Task?"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onCancel={() => setIsModalOpen(false)}
        onConfirm={() => {
          deleteTask(task.id);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
