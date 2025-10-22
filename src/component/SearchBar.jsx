// src/component/SearchBar.jsx
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // send the search query to parent
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Search products..."
        className="flex-1 px-3 py-2 outline-none"
      />
      <button className="text-primary  px-2 py-2  mr-3">
        <FaSearch />
      </button>
    </div>
  );
}
