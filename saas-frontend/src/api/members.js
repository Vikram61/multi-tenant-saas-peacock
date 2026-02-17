import client from "./client";

export const fetchMembers = async () => {
  const res = await client.get("/org/members");
  return res.data;
};

export const inviteMember = async (email, role) => {
  const res = await client.post("/org/invite", { email, role });
  return res.data;
};

/* NEW */
export const updateMemberRole = async (id, role) => {
  const res = await client.patch(`/org/members/${id}/role`, { role });
  return res.data;
};

export const removeMember = async (id) => {
  const res = await client.delete(`/org/members/${id}`);
  return res.data;
};
