// https://github.com/karansuryawanshi/youtube_clone

// Import necessary hooks and utilities from React
import { createContext, useContext, useState, useEffect } from "react";

// Create a context to hold channel-related data
const ChannelContext = createContext();

// Define the ChannelProvider component that wraps children components with channel context
const ChannelProvider = ({ children }) => {
  // State to store channel data and loading status
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch current user's channel details
  const fetchChannel = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false); // Skip fetch if no token

    try {
      // Make authenticated GET request to fetch channel info
      const res = await fetch(
        "https://youtube-clone-phfd.onrender.com/api/channels/my/channel",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json(); // Parse JSON response
      setChannel(data); // Update channel state
    } catch (err) {
      console.error("Error fetching channel:", err.message); // Log any errors
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  // Fetch channel data on component mount
  useEffect(() => {
    fetchChannel();
  }, []);

  // Provide channel state and refetch method to consumers
  return (
    <ChannelContext.Provider
      value={{ channel, loading, refreshChannel: fetchChannel }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

// Custom hook to use channel context
const useChannel = () => useContext(ChannelContext);

// Export the provider and custom hook
export { ChannelProvider, useChannel };
