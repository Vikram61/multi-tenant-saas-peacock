import client from "./client";

export const fetchProjects = async () => {
  const res = await client.get("/projects");
  return res.data;
};

export const createProject = async (data) => {
  const res = await client.post("/projects", data);
  return res.data;
};
