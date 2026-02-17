import { Navigate, useLocation } from "react-router-dom";
import { useAuth, AuthProvider } from "../context/AuthContext";

const InnerProtected = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/signup" replace state={{from : location}} />;
if (user && !user.organization) return <Navigate to="/create-or-join" />;

  return children;
};

const ProtectedRoute = ({ children }) => {
  return (
    <AuthProvider>
      <InnerProtected>{children}</InnerProtected>
    </AuthProvider>
  );
};

export default ProtectedRoute;
