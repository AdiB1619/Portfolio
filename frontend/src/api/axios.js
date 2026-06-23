import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true,
});

// Pass errors through — no global redirect.
// Authenticated-page protection is handled by ProtectedRoute.
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
