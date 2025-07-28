import axios from "axios";

const API_URL = `${import.meta.env.VITE_URL_API}/auth`; // đổi nếu backend chạy cổng khác

export const registerAPI = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/register`, { email, password });
  return res.data;
};

export const loginAPI = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data; // chứa access_token
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
