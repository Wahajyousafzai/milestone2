'use client';
import { useState } from 'react';
import RecipeGrid from '@/components/RecipeGrid';
import SearchBar from '@/components/SearchBar';

export default function RecipesPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const cuisines = [
    { id: 'all', label: 'All Cuisines' },
    { id: 'pakistani', label: '🍖 Pakistani' },
    { id: 'italian', label: '🍝 Italian' },
    { id: 'indian', label: '🍛 Indian' },
    { id: 'japanese', label: '🍜 Japanese' },
    { id: 'mediterranean', label: '🥗 Mediterranean' },
  ];

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800 gradient-text">
          Browse Recipes
        </h1>
        <p className="text-gray-600">
          Discover recipes from around the world
        </p>
      </div>
      
      <SearchBar onFilterChange={handleFilterChange} />

      <div className="flex justify-center gap-3 flex-wrap">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.id}
            onClick={() => setSelectedCuisine(cuisine.id)}
            className={`filter-btn px-4 py-2 rounded-full transition-all duration-300
              ${selectedCuisine === cuisine.id 
                ? 'bg-green-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {cuisine.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {selectedCuisine !== 'all' && (
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Showing {selectedCuisine.charAt(0).toUpperCase() + selectedCuisine.slice(1)} Recipes
          </h2>
        )}
        <RecipeGrid 
          selectedFilter={selectedFilter} 
          selectedCuisine={selectedCuisine}
        />
      </div>
    </div>
  );
} 