import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Task, TaskContextType } from './TaskTypes';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  const updateTask = (updated: Task) =>
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));

  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t._id !== id));

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTask must be used within TaskProvider');
  return context;
};
