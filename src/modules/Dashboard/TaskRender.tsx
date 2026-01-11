import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Pen, Trash2, SaveIcon, X } from "lucide-react";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";

interface TaskRenderProps {
  task: {
    id: string;
    name: string;
    description?: string;
    active: boolean;
    dueDate?: string;
  };
  setTasks: Dispatch<SetStateAction<any[]>>;
}

export default function TaskRender({ task, setTasks }: TaskRenderProps) {
  const { auth } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const edittedTask = useRef<HTMLInputElement>(null);
  function handleCheckboxChange(checked: boolean) {
    if (!auth) return;
    fetch(import.meta.env.VITE_TASKS_URL!, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        id: task.id,
        active: !checked,
        name: task.name,
        description: task.description || "",
        dueDate: task.dueDate || null,
      }),
    })
      .then((res) => {
        if (res.status == 403 || res.status == 401) return;
        return res.json();
      })
      .then((updatedTask) => {
        console.log("Task updated:", updatedTask);
        setTasks((prevTasks) => {
          return prevTasks.map((t) => {
            if (t.id === updatedTask.id) {
              return updatedTask;
            }
            return t;
          });
        });
      })
      .catch((err) => console.error("Error updating task:", err));
  }

  function handleDeleteTask(taskId: number) {
    if (!auth) return;
    fetch(`${import.meta.env.VITE_TASKS_URL!}/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
        }
      })
      .catch((err) => console.error("Error deleting tasks:", err));
  }

  function handleSaveTask() {
    if (!auth || !edittedTask.current) {
      setIsEdit(false);
      return;
    }
    const newName = edittedTask.current.value;
    if (newName.trim() === "" || newName.trim() === task.name) {
      setIsEdit(false);
      return;
    }

    fetch(import.meta.env.VITE_TASKS_URL!, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        id: task.id,
        name: newName,
        description: task.description || "",
        active: task.active,
        dueDate: task.dueDate || null,
      }),
    })
      .then((res) => {
        if (res.status == 403 || res.status == 401) return;
        return res.json().then((updatedTask) => {
          setTasks((prevTasks) => {
            return prevTasks.map((t) => {
              if (t.id === updatedTask.id) {
                return updatedTask;
              }
              return t;
            });
          });
        });
      })
      .catch((err) => console.error("Error updating task:", err))
      .finally(() => setIsEdit(false));
  }
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-2 w-full">
        <Checkbox
          defaultChecked={!task.active}
          onCheckedChange={handleCheckboxChange}
          className="h-[30px] flex justify-center items-center"
        />
        {isEdit ? (
          <Input
            defaultValue={task.name}
            className="w-full"
            ref={edittedTask}
          />
        ) : (
          <span>{task.name}</span>
        )}
      </div>
      <div className="flex gap-1">
        {isEdit ? (
          <Button type="button" size={"icon-sm"} className="!bg-blue-500" onClick={handleSaveTask}>
            <SaveIcon />
          </Button>
        ) : (
          <Button
            type="button"
            size={"icon-sm"}
            onClick={() => setIsEdit(true)}
            className="!bg-blue-500"
          >
            <Pen />
          </Button>
        )}
        {isEdit ? (
          <Button
            type="button"
            size={"icon-sm"}
            className="!bg-red-500"
            onClick={() => setIsEdit(false)}
          >
            <X />
          </Button>
        ) : (
          <Button
            onClick={() => handleDeleteTask(Number(task.id))}
            size={"icon-sm"}
            className="bg-red"
          >
            <Trash2 />
          </Button>
        )}
      </div>
    </div>
  );
}
