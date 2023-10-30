import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

const AuthContext = createContext(); // create context here

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasAccess = localStorage.getItem("accessToken");
    const role =localStorage.getItem("roles");
    if (hasAccess) {
      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = (token) => {
    Cookie.set("user", token, { expires: 14, secure: true, sameSite: 'strict' }); // to secure the token
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    Cookie.remove("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };