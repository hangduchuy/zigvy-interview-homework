export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

export interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}
