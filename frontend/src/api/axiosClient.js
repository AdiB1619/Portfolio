import axios from 'axios';

/**
 * Central Axios instance.
 *
 * During development, the Vite proxy forwards /api → http://localhost:5000
 * so we don't need to hard-code the backend port in every request.
 *
 * In production, VITE_API_URL points to the deployed backend (e.g. Render).
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true, // Required for httpOnly cookies to be sent
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Response interceptor ─────────────────────────────────────────────────
// Unwraps the { success, data } envelope so callers get the payload directly.
// On 401, the consumer (AuthContext) handles the redirect to login.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
