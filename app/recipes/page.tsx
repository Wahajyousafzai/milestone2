'use client';
import { useState } from 'react';
import RecipeGrid from '@/components/RecipeGrid';
import SearchBar from '@/components/SearchBar';

export default function BrowseRecipes() {
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const cuisines = [
    { id: 'all', label: 'All Cuisines' },
    { id: 'italian', label: '🍝 Italian' },
    { id: 'indian', label: '🍛 Indian' },
    { id: 'japanese', label: '🍜 Japanese' },
    { id: 'american', label: '🍔 American' },
    { id: 'mediterranean', label: '🥗 Mediterranean' },
  ];

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Browse Recipes</h1>
        <p className="text-gray-600">Discover recipes from around the world</p>
      </div>

      <SearchBar />

      <div className="flex justify-center gap-3 flex-wrap">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.id}
            onClick={() => setSelectedCuisine(cuisine.id)}
            className={`px-4 py-2 rounded-full transition-all duration-300
              ${selectedCuisine === cuisine.id 
                ? 'bg-green-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {cuisine.label}
          </button>
        ))}
      </div>

      <RecipeGrid />
    </div>
  );
} 