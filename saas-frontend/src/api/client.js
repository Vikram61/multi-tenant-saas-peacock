import axios from "axios";
import { getAccessToken } from "./tokenStore";
import { triggerUpgrade } from "./upgradeHandler";

const client = axios.create({
  baseURL: "http://localhost:5000/api"
});

client.interceptors.request.use(config => {

  const PUBLIC_AUTH_ROUTES = [
    "/auth/login",
    "/auth/signup",
    "/auth/accept-invite"
  ];

  const isPublic = PUBLIC_AUTH_ROUTES.some(route =>
    config.url?.startsWith(route)
  );

  if (!isPublic) {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  res => res,
  error => {
    if (error.response?.status === 403) {
      triggerUpgrade(error.response.data?.message || "Upgrade required");
    }
    return Promise.reject(error);
  }
);

export default client;
