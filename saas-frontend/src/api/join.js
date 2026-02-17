import client from "./client";

export const joinOrganization = async (data) => {
  const res = await client.post("/auth/accept-invite", data);
  return res.data;
};
