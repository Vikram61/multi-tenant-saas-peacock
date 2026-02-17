import publicClient from "./publicClient";

export const acceptInvite = async (token, data) => {
  const res = await publicClient.post(`/invite/join/${token}`, data);
  return res.data;
};
