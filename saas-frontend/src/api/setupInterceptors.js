import client from "./client";
import { getAccessToken, setAccessToken } from "./tokenStore";
import { refreshAccessToken } from "./refresh";
import { useUpgrade } from "../context/UpgradeContext";
import { triggerUpgrade } from "./upgradeHandler";

let isRefreshing = false;

export const setupInterceptors = () => {

  client.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });


client.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // PLAN LIMIT DETECTED
    if (error.response?.status === 403) {
      triggerUpgrade(error.response.data?.message || "Upgrade required");
      return Promise.reject(error);
    }

    if (originalRequest.url.includes("/auth/refresh"))
      return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();
      if (!newToken) return Promise.reject(error);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return client(originalRequest);
    }

    return Promise.reject(error);
  }
);

};
