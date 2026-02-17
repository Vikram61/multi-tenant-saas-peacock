import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";
import { refreshAccessToken } from "../api/refresh";
import { fetchOrg } from "../api/org";
import * as perm from "../utils/permissions";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
const PUBLIC_ROUTES = ["/login", "/join", '/signup'];

const logoutUser = async () => {
  try {
    await logout();
  } catch {}

  setUser(null);
  setOrg(null);
  setAccessToken(null);
};


const loadSession = async () => {
  const path = window.location.pathname;

  if (PUBLIC_ROUTES.some(r => path.startsWith(r))) {
    setLoading(false);
    return;
  }

  try {
    // Step 1 — try restore session
    const token = await refreshAccessToken();
    if (!token) throw new Error("No session");

    // Step 2 — identify user
    const me = await client.get("/auth/me", { skipAuthRefresh: true });
    setUser(me.data);

    // Step 3 — ONLY NOW fetch org
    try {
      const organization = await fetchOrg(); 
      setOrg(organization);
    } catch {
      setOrg(null); // prevent retry loop
    }

  } catch {
    setUser(null);
    setOrg(null);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    loadSession();
  }, []);

  return (
<AuthContext.Provider value={{
    user,
    setUser,
    logoutUser,
    org,
    loading,
    permissions: user ? {
      canInvite: perm.canInvite(user.role),
      canManageMembers: perm.canManageMembers(user.role),
      canUpgrade: perm.canUpgrade(user.role),
      canCreateProject: perm.canCreateProject(user.role)
    } : {}
  }}>
    {children}
  </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
