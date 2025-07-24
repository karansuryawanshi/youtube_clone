// https://github.com/karansuryawanshi/youtube_clone

// Import React hooks and necessary libraries
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // For decoding JWT token
import axios from "axios"; // For making API requests

// Create a UserContext to hold user-related data
const UserContext = createContext();

// UserProvider component to wrap around components that need access to user context
export const UserProvider = ({ children }) => {
  // State to store the logged-in user's data
  const [user, setUser] = useState(null);

  // Function to load the user from the token
  const loadUser = async () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    // If no token found, clear user
    if (!token) return setUser(null);

    try {
      // Decode token (optional use here, mainly for ID if needed)
      const decoded = jwtDecode(token);

      // Fetch user info from server using the token
      const res = await axios.get(
        "https://youtube-clone-phfd.onrender.com/api/auth/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Set user data in state
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user:", err);
      setUser(null); // If error occurs, clear user
    }
  };

  // Function to log the user out
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
  };

  // Load user on initial render
  useEffect(() => {
    loadUser();
  }, []);

  // Provide user data and actions to children components
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext in components
export const useUser = () => useContext(UserContext);
