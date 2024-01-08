// SearchBar.jsx

import { MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchBar = () => {
  const [searchTicker, setSearchTicker] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTicker(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/stockAnalysis/ticker/${searchTicker}`);
  };

  return (
<div className="flex w-4/5 relative group">
  {/* Gradient Border */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
  
  {/* Search Input */}
  <input 
    type="text"
    placeholder="Enter ticker (e.g., U, AAPL)"
    value={searchTicker}
    onChange={handleSearchChange}
    className="p-2 border border-transparent bg-white rounded-l-md focus:ring-indigo-600 focus:border-indigo-600 block w-full shadow-sm sm:text-sm z-10"
  />

  {/* Search Button */}
  <button 
    onClick={handleSearchSubmit}
    className="flex items-center bg-indigo-600 hover:bg-indigo-800 text-white rounded-r-md p-2 transition duration-150 ease-in-out z-10"
  >
    <MdSearch className="mr-2" />
    <span>Search</span>
  </button>
</div>

  );
};

export default SearchBar;
