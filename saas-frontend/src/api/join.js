import publicClient from "./publicClient";

export const joinOrganization = async ({ token, name, password }) => {
  const res = await publicClient.post("/auth/accept-invite", {
    token,
    name,
    password
  });
  return res.data;
};
