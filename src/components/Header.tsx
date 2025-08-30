"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import TaskStatus from "@/components/TaskStatus";
import { api } from "@/lib/api";
import { Task } from "@/types/task.types";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api.getTasks().then(setTasks).catch(console.error);
  }, []);


  if (pathname !== "/") return null;

  return (
    <>
      <Button
        text="Create Task"
        action="Add"
        onClick={() => router.push("/tasks/create")}
      />
      <TaskStatus />
    </>
  );
}
