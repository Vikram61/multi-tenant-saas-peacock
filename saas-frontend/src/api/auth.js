import client from './client';

let accessToken = null;



export const loginUser = async (email, password) => {
  const res = await client.post("/auth/login", { email, password });
  return res.data;
};

export const signup = async(data)=>{
  const res= await client.post("/auth/signup", data);
  return res.data
}

export const logout = async () => {
  await client.post("/auth/logout");
};