// import { useState, useContext, createContext } from "react";

// // ✅ Correctly create the context
// const AuthContext = createContext();

// // Auth Provider
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!localStorage.getItem("token")
//   );

//   // ✅ Login Function
//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
//   };

//   // ✅ Logout Function
//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Custom Hook to use AuthContext
// export const useAuth = () => useContext(AuthContext);

import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("user_id") || null;
  });

  useEffect(() => {
    console.log("Auth State Updated: userId =", userId);
  }, [userId]);

  const login = (id) => {
    localStorage.setItem("user_id", id);
    setUserId(id);
    console.log("User logged in with ID:", id);
  };

  const logout = () => {
    localStorage.removeItem("user_id");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};


