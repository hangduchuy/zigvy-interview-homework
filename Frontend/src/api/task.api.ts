import type { Task } from "../contexts/TaskTypes";
import api from "./axiosInstance";

const API_URL = `${import.meta.env.VITE_URL_API}/tasks`; // đổi nếu backend chạy cổng khác

export const fetchTasks = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

export const createTask = async (task: Task) => {
  const res = await api.post(API_URL, task);
  return res.data;
};

export const updateTask = async (task: Task) => {
  const { _id, title, description, dueDate, status } = task;
  console.log({ task });
  const res = await api.patch(`${API_URL}/${_id}`, {
    title,
    description,
    dueDate,
    status,
  });
  return res.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`${API_URL}/${id}`);
};
