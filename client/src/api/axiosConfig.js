// src/api/axiosConfig.js
// Centralized Axios instance used throughout the app

import axios from "axios";

// ─── Create Axios Instance ────────────────────────────────────────────────────
// All API requests will use this base URL, so we only need to specify the path
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Change this in production
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Before every request is sent, this runs and attaches the JWT token
// from localStorage to the Authorization header (if available)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // "Bearer <token>" is the standard format for JWT auth headers
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // If setting up the request failed, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
