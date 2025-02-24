import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://inventory-management-v976.onrender.com/api",
  
});
console.log('API Base URL:', import.meta.env.VITE_API_URL);  // Debug check

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
