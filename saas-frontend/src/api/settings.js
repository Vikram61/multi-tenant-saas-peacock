import client from "./client";

/* USER */

export const updateProfile = async (data) => {
  const res = await client.patch("/auth/profile", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await client.patch("/users/password", data);
  return res.data;
};

/* ORG */

export const updateOrganization = async (data) => {
  const res = await client.patch("/org", data);
  return res.data;
};

/* SECURITY */

export const logoutAllDevices = async () => {
  const res = await client.post("/auth/logout-all", {});
  return res.data;
};
