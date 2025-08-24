import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //or /api with proxy server;
  headers: {
    'Content-Type': 'application/json',
  },
});

// Har bir so‘rovdan oldin token qo‘shish
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
