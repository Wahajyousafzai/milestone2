'use client';

import { useState } from 'react';

type Props = {
  onFilterChange: (filter: string) => void;
  onSearch?: (searchTerm: string) => void;
};

const SearchBar = ({ onFilterChange, onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'vegetarian', label: '🥗 Vegetarian' },
    { id: 'quick', label: '⚡ Quick & Easy' },
    { id: 'dessert', label: '🍰 Desserts' },
  ];

  const handleFilterClick = (filterId: string) => {
    setSelectedFilter(filterId);
    onFilterChange(filterId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Implement real-time search
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search recipes by name, ingredient, or cuisine..."
          className="w-full p-4 pl-12 border border-gray-200 rounded-full 
            focus:ring-2 focus:ring-green-500 focus:border-transparent
            shadow-sm hover:shadow-md transition-shadow"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
          🔍
        </span>
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 text-white 
            px-6 py-2 rounded-full hover:bg-green-600 transition-colors
            shadow-md hover:shadow-lg"
        >
          Search
        </button>
      </form>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300
              ${selectedFilter === filter.id 
                ? 'bg-green-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar; 