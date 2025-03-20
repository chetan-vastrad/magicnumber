import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { userId } = useAuth();
  return userId ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
