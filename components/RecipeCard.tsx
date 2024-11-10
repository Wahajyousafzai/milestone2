"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Recipe = {
    id: number;
    title: string;
    description: string;
    image: string;
    rating: number;
    cuisine: string;
};

type Props = {
    recipe: Recipe;
};

const RecipeCard = ({ recipe }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check if recipe is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some((fav: Recipe) => fav.id === recipe.id));
    }, [recipe.id]);

    const handleCardClick = () => {
        router.push(`/recipes/${recipe.id}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        if (isFavorite) {
            // Remove from favorites
            const newFavorites = favorites.filter((fav: Recipe) => fav.id !== recipe.id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        } else {
            // Add to favorites
            localStorage.setItem('favorites', JSON.stringify([...favorites, recipe]));
        }
        
        setIsFavorite(!isFavorite);
    };

    return (
        <div 
            onClick={handleCardClick}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full aspect-[16/9] group">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className={`object-cover transition-transform duration-300 
                        ${isHovered ? 'scale-105' : 'scale-100'}`}
                />
                <button 
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow-lg
                        transform transition-all duration-300 hover:scale-110 z-10"
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors">
                        {recipe.title}
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                        {recipe.cuisine}
                    </span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                    {recipe.description}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, index) => (
                            <span 
                                key={index}
                                className={`text-lg ${
                                    index < Math.floor(recipe.rating) 
                                        ? 'text-yellow-400' 
                                        : 'text-gray-300'
                                }`}
                            >
                                ★
                            </span>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({recipe.rating})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard; 