import client from "./client";
import { setAccessToken } from "./tokenStore";

export const refreshAccessToken = async () => {
  try {
    const res = await client.post("/auth/refresh");
    setAccessToken(res.data.accessToken);
    return res.data.accessToken;
  } catch {
    setAccessToken(null);
    return null;
  }
};
