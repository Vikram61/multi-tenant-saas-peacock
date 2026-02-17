export const ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER"
};

export const canInvite = role =>
  role === ROLES.OWNER || role === ROLES.ADMIN;

export const canManageMembers = role =>
  role === ROLES.OWNER || role === ROLES.ADMIN;

export const canUpgrade = role =>
  role === ROLES.OWNER;

export const canCreateProject = role =>
  role === ROLES.OWNER || role === ROLES.ADMIN || role === ROLES.MEMBER;
