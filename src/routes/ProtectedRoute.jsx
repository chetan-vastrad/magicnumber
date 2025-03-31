// import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useContext(useAuth);
//   const [loading, setLoading] = useState(true);
//   const [authUser, setAuthUser] = useState(user);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setAuthUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, [user]);

//   if (loading) return <div>Loading...</div>;  // Prevent immediate redirection

//   return authUser ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
