// // import { useState, useContext, createContext } from "react";

// // // ✅ Correctly create the context
// // const AuthContext = createContext();

// // // Auth Provider
// // export const AuthProvider = ({ children }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(
// //     !!localStorage.getItem("token")
// //   );

// //   // ✅ Login Function
// //   const login = (token) => {
// //     localStorage.setItem("token", token);
// //     setIsAuthenticated(true);
// //   };

// //   // ✅ Logout Function
// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     setIsAuthenticated(false);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // // ✅ Custom Hook to use AuthContext
// // export const useAuth = () => useContext(AuthContext);
// import { createContext, useState, useEffect, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userId, userData) => {
//     setUser(userData);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook for Auth
// export const useAuth = () => {
//   return useContext(AuthContext);
// };





