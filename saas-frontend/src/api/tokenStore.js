/* READ — always source of truth */
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

/* WRITE */
export const setAccessToken = (token) => {
  if (token)
    localStorage.setItem("accessToken", token);
  else
    localStorage.removeItem("accessToken");
};

/* CLEAR */
export const clearAccessToken = () => {
  localStorage.removeItem("accessToken");
};
