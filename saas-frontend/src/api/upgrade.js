import client from "./client";

export const upgradePlan = async (plan) => {
  const res = await client.post("/org/upgrade", { plan });
  return res.data;
};
