import { createContext, useContext, useState, useEffect } from "react";

const ChannelContext = createContext();

const ChannelProvider = ({ children }) => {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChannel = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    try {
      const res = await fetch("http://localhost:5000/api/channels/my/channel", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setChannel(data);
      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  return (
    <ChannelContext.Provider
      value={{ channel, loading, refreshChannel: fetchChannel }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

const useChannel = () => useContext(ChannelContext);

// ✅ Consistent named exports
export { ChannelProvider, useChannel };
