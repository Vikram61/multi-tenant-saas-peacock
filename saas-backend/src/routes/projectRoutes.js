const express = require("express");
const router = express.Router();
const Project = require('../models/Project')
const { requireAuth } = require("../middleware/authMiddleware");
const { requireTenant } = require("../middleware/tenantMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const asyncHandler = require('express-async-handler');
const { createProject, getProjects } = require("../services/projectService");
const { checkProjectLimit } = require("../middleware/planMiddleware");

router.post(
  "/",
  requireAuth,
  requireTenant,
  allowRoles("OWNER", "ADMIN"),
  checkProjectLimit,
  async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!name)
        return res.status(400).json({ message: "Project name required" });

      const project = await Project.create({
        name,
        description,
        organization: req.tenantId,
        createdBy: req.user._id
      });

      res.status(201).json(project);

    } catch (err) {
      console.error("CREATE PROJECT ERROR:", err.message);
      res.status(500).json({ message: "Failed to create project" });
    }
  }
);

router.get(
  "/",
  requireAuth,
  requireTenant,
  async (req, res) => {
    const projects = await Project.find({
      organization: req.tenantId
    }).sort({ createdAt: -1 });

    res.json(projects);
  }
);

module.exports = router;
