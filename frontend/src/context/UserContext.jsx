import { createContext, useContext, useEffect, useState } from "react";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // full user info

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", localStorage.getItem("token"));

    if (!token) return setUser(null);

    try {
      const decoded = jwtDecode(token);
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user:", err);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    console.log("Called loadUser");
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
