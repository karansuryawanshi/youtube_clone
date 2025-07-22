// https://github.com/karansuryawanshi/youtube_clone

// Import necessary React functions
import { createContext, useContext, useState } from "react";

// Create a new context for search functionality
const SearchContext = createContext();

// Define the provider component to wrap the app or part of the app that needs search context
export const SearchProvider = ({ children }) => {
  // State to hold the search value
  const [search, setSearch] = useState("");

  // Provide the search value and setter to all child components
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context in other components
export const useSearch = () => useContext(SearchContext);
