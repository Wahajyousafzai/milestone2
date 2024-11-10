"use client";
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState('');
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="font-bold text-2xl text-white hover:scale-105 transition-transform"
            onMouseEnter={() => setIsHovered('home')}
            onMouseLeave={() => setIsHovered('')}
          >
            🍳 RecipeShare
          </Link>
          
          <div className="flex items-center space-x-6">

            <Link 
              href="/favorites" 
              className={`text-white hover:text-green-100 transition-all duration-300 relative
                ${pathname === '/favorites' ? 'font-semibold' : ''}
                ${isHovered === 'favorites' ? 'transform -translate-y-0.5' : ''}`}
              onMouseEnter={() => setIsHovered('favorites')}
              onMouseLeave={() => setIsHovered('')}
            >
              ❤️ Favorites
              {(isHovered === 'favorites' || pathname === '/favorites') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full" />
              )}
            </Link>
            <Link 
              href="/submit-recipe" 
              className={`bg-white text-green-600 px-6 py-2 rounded-full font-medium
                hover:bg-green-50 hover:shadow-lg transform hover:-translate-y-0.5 
                transition-all duration-300
                ${pathname === '/submit-recipe' ? 'shadow-lg' : ''}`}
            >
              + Add Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 