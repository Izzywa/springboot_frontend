import { useEffect, useState } from "react";

export default function Dashboard() {
   const [tasks, setTasks] = useState<any[]>([]);
   useEffect(() => {
      fetch(import.meta.env.VITE_TASKS_URL!)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Error fetching tasks:", err));
   }, [])
   return (<div>
    Dashboard Page
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
   </div>)
}