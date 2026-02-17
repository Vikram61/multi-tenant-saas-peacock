import client from './client';

let accessToken = null;

export const setAccessToken = (token)=>{
    accessToken=token;
}

client.interceptors.request.use(config=>{
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})


export const loginUser = async (email, password) => {
  const res = await client.post("/auth/login", { email, password });
  return res.data;
};