import client from "./client";

export const fetchOverview = async () => {
  const res = await client.get("/analytics/overview");
  return res.data;
};
