import client from './client';
import { clearAccessToken } from './tokenStore';

export const loginUser = async (email, password) => {
  const res = await client.post("/auth/login", { email, password });
  return res.data; // DO NOT store token here
};

export const signup = async(data)=>{
  const res= await client.post("/auth/signup", data);
  return res.data;
}

export const logout = async () => {
  clearAccessToken();
};
