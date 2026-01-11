import { useEffect, useRef, useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TaskRender from "./TaskRender";

export default function Dashboard() {
  const { auth, logout } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const taskRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!auth) return;

    fetch(import.meta.env.VITE_TASKS_URL!, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        if (res.status == 403 || res.status == 401) logout();
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [auth, logout]);

  function handleAddTask(e: FormEvent) {
    e.preventDefault();
    if (!auth || taskRef.current?.value.trim() === "") return;
    fetch(import.meta.env.VITE_TASKS_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
      },
      body: JSON.stringify({
        name: taskRef.current?.value,
        description: "",
        dueDate: null,
        active: true,
      }),
    })
      .then((res) => {
        if (res.status == 403 || res.status == 401) logout();
        return res.json();
      })
      .then((newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        if (taskRef.current) {
          taskRef.current.value = "";
        }
      })
      .catch((err) => console.error("Error adding task:", err));
  }
  return (
    <div className="container p-5 flex flex-col gap-4">
      <h1>Dashboard Page</h1>
      {tasks.map((task) => (
        <TaskRender key={task.id} task={task} setTasks={setTasks} />
      ))}
      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input type="text" placeholder="New task name" ref={taskRef} />

        <Button type="submit">Add Task</Button>
      </form>
    </div>
  );
}
