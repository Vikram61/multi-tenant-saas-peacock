import { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";
import { fetchOrg } from "../api/org";
import * as perm from "../utils/permissions";
import { getAccessToken, clearAccessToken, setAccessToken } from "../api/tokenStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);



const logoutUser = () => {
  setUser(null);
  setOrg(null);
  window.location.href = "/login";
};




const loadSession = async () => {
  try {
    const me = await client.get("/auth/me");
    setUser(me.data);

    const organization = await fetchOrg();
    setOrg(organization);

  } catch {
    setUser(null);
    setOrg(null);
    clearAccessToken();
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  const url = new URL(window.location.href);

  // Skip auth check if invite flow in progress
  if (url.searchParams.get("invite")) {
    setLoading(false);
    return;
  }

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
