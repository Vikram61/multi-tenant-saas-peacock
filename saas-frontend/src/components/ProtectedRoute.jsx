import { Navigate } from "react-router-dom";
import { useAuth, AuthProvider } from "../context/AuthContext";

const InnerProtected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

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
