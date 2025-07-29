import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as taskApi from "../api/task.api";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "To Do" | "In Progress" | "Done";
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    const data = await taskApi.fetchTasks();
    setTasks(data);
  };

  const addTask = async (task: Task) => {
    const newTask = await taskApi.createTask(task);
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = async (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    await taskApi.updateTask(updatedTask);
  };

  const deleteTask = async (id: string) => {
    await taskApi.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>{children}</TaskContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within TaskProvider");
  return context;
};
