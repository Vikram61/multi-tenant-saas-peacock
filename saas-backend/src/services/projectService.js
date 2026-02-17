const Project = require("../models/Project");
const Organization = require("../models/Organization");
const PLANS = require("../config/plans");
const createProject = async (tenantId, userId, data) => {

  const org = await Organization.findById(tenantId);

  const limits = PLANS[org.plan];

  if (org.projectCount >= limits.maxProjects)
    throw new Error("Project limit reached. Upgrade plan.");

  const project = await Project.create({
    ...data,
    organization: tenantId,
    createdBy: userId
  });

  org.projectCount += 1;
  await org.save();

  return project;
};
const getProjects = async (tenantId) => {
  return Project.find({ organization: tenantId }).sort({ createdAt: -1 });
};

module.exports = { createProject, getProjects };
