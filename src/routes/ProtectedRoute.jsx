import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  console.log("ProtectedRoute: Auth Context =", auth);

  return auth.userId ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
