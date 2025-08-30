"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { COLOR_HEX, Color } from "@/types/task.types";
import Button from "./Button";
import LeftArrowIcon from "./icons/LeftArrowIcon";
import { api } from "@/lib/api";
import { useTasks } from "@/context/TaskProvider";

interface TaskFormProps {
  initialTitle?: string;
  initialColor?: Color;
  taskId?: number;
}

export default function TaskForm({
  initialTitle = "",
  initialColor = "red",
  taskId,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState<Color>(initialColor);
  const router = useRouter();
  const { fetchTasks } = useTasks();

  useEffect(() => {
    if (taskId) {
      setTitle(initialTitle);
      setColor(initialColor);
    }
  }, [initialTitle, initialColor, taskId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (taskId) {
        await api.updateTask(taskId, { title, color });
      } else {
        await api.createTask({ title, color, completed: false });
      }
      await fetchTasks();
      router.push("/");
    } catch (err) {
      console.error("Failed to save task:", err);
    } 
  };

  return (
    <div className="fixed inset-x-0 top-[30%] flex flex-col items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto p-4 flex flex-col gap-4"
      >
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-2xl mr-auto cursor-pointer"
        >
          <LeftArrowIcon />
        </button>

        <div className="flex flex-col">
          <label htmlFor="task-title" className="mb-3 font-semibold text-[#4EA8DE]">
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Brush Teeth"
            required
            className="border-none p-4 rounded-xl w-full bg-[#333333]"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-3 font-semibold text-[#4EA8DE]">Color</label>
          <div className="flex gap-2">
            {(Object.keys(COLOR_HEX) as Array<keyof typeof COLOR_HEX>).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                style={{ backgroundColor: COLOR_HEX[c] }}
                className={`w-12 h-12 rounded-full border-2 cursor-pointer ${
                  color === c ? "border-white" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        <Button text={taskId ? "Update Task" : "Add Task"} action={taskId ? "Update" : "Add"} />
      </form>
    </div>
  );
}
