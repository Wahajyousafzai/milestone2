'use client';
import { useState, useEffect } from 'react';
import RecipeCard from '@/components/RecipeCard';

// Type for recipe
type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  cuisine: string;
};

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch this from an API or local storage
    const getFavorites = () => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      setIsLoading(false);
    };

    getFavorites();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin text-4xl">🍳</div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="text-6xl">💝</span>
          <h1 className="text-2xl font-bold text-gray-800">No favorites yet</h1>
          <p className="text-gray-600">Start adding recipes to your favorites!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Your Favorites</h1>
        <p className="text-gray-600">All your saved recipes in one place</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
} 