


import React, { createContext, useState, useEffect } from "react";


export const AuthContext = createContext();

const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    return payload.exp > Date.now() / 1000; 
  } catch (e) {
    return false;
  }
};


export const AuthProvider = ({ children }) => {
  
  const getInitialState = () => {
    const savedToken = localStorage.getItem("jwt");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser && isTokenValid(savedToken)) {
      return {
        isLoggedIn: true,
        user: JSON.parse(savedUser),
      };
    }
    return {
      isLoggedIn: false,
      user: null,
    };
  };

  const [authState, setAuthState] = useState(getInitialState());

  


  
  const login = (userData) => {
    setAuthState({ isLoggedIn: true, user: userData });

    localStorage.setItem("jwt", userData.jwt); 
    localStorage.setItem("user", JSON.stringify(userData)); 
  };

  
  const logout = () => {
    setAuthState({ isLoggedIn: false, user: null });

    localStorage.removeItem("jwt"); 
    localStorage.removeItem("user"); 
  };

 
  const getAuthToken = () => {
    return localStorage.getItem("jwt");
  };

  
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: authState.isLoggedIn,
        user: authState.user,
        login,
        logout,
        getAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


