import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { auth, logout } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
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
  }
  return (
    <div className="flex flex-col gap-3">
      <h1>Dashboard Page</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
      <form onSubmit={handleAddTask} className="flex gap-2">
        <Input type="text" placeholder="New task name" />
        <Button type="submit">Add Task</Button>
      </form>
    </div>
  );
}
