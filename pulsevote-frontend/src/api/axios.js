import axios from 'axios';
import { getToken } from '../lib/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://localhost:5000',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
