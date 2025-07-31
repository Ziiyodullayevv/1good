// src/lib/axiosInstance.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env fayldan API manzili
  headers: {
    'Content-Type': 'application/json',
  },
});

// Har bir so‘rovdan oldin token qo‘shish
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
