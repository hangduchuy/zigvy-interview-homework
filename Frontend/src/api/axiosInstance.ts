import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Attach token from localStorage or other source
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // hoặc từ cookie, context, v.v.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
