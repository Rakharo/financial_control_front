import axios from "axios";
import { triggerLogout } from "../auth/authEvents";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        const response = await api.post("/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newAccessToken = response.data.access_token;

        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error(err);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        triggerLogout();
      }
    }

    const backendMessage = error.response?.data?.message || "Erro inesperado";

    error.message = backendMessage;

    return Promise.reject(error);
  },
);
