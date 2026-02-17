const requireTenant = (req, res, next) => {

  if (!req.user || !req.user.organization)
    return res.status(403).json({ message: "No tenant context" });

  req.tenantId = req.user.organization;
  next();
};

module.exports = { requireTenant };
