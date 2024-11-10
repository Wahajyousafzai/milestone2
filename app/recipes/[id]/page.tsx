"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// This would typically come from an API or database
const getRecipeDetails = (id: string) => {
  const recipes = {
    "1": {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
      image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?q=80&w=1000&auto=format&fit=crop",
      rating: 4.5,
      cuisine: "Italian",
      ingredients: [
        "400g spaghetti",
        "200g pancetta",
        "4 large eggs",
        "100g Pecorino Romano",
        "100g Parmigiano Reggiano",
        "Black pepper",
        "Salt"
      ],
      instructions: [
        "Bring a large pot of salted water to boil and cook spaghetti according to package instructions",
        "While pasta cooks, cut pancetta into small cubes and fry until crispy",
        "In a bowl, whisk eggs, grated cheeses, and black pepper",
        "Drain pasta, reserving some pasta water",
        "Combine hot pasta with pancetta, then quickly stir in egg mixture",
        "Add pasta water if needed for creaminess",
        "Serve immediately with extra cheese and black pepper"
      ],
      prepTime: "10 minutes",
      cookTime: "20 minutes",
      servings: 4
    },
    "2": {
      id: 2,
      title: "Vegetable Curry",
      description: "Creamy and spicy Indian curry with mixed vegetables",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      cuisine: "Indian",
      ingredients: [
        "Mixed vegetables (carrots, peas, potatoes)",
        "Onions",
        "Tomatoes",
        "Ginger-garlic paste",
        "Curry spices",
        "Coconut milk",
        "Fresh coriander"
      ],
      instructions: [
        "Sauté onions until golden",
        "Add ginger-garlic paste and spices",
        "Add vegetables and cook",
        "Pour in coconut milk and simmer",
        "Garnish with fresh coriander"
      ],
      prepTime: "20 minutes",
      cookTime: "25 minutes",
      servings: 4
    },
    "3": {
      id: 3,
      title: "Caesar Salad",
      description: "Fresh romaine lettuce with classic Caesar dressing and croutons",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1000&auto=format&fit=crop",
      rating: 4.2,
      cuisine: "American",
      ingredients: [
        "Romaine lettuce",
        "Croutons",
        "Parmesan cheese",
        "Caesar dressing",
        "Black pepper",
        "Anchovies (optional)"
      ],
      instructions: [
        "Wash and chop romaine lettuce",
        "Make or prepare Caesar dressing",
        "Toss lettuce with dressing",
        "Add croutons and parmesan",
        "Season with black pepper"
      ],
      prepTime: "15 minutes",
      cookTime: "0 minutes",
      servings: 4
    },
    "4": {
      id: 4,
      title: "Chocolate Cake",
      description: "Rich and moist chocolate cake with ganache",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
      rating: 4.9,
      cuisine: "International",
      ingredients: [
        "Flour",
        "Cocoa powder",
        "Sugar",
        "Eggs",
        "Butter",
        "Milk",
        "Dark chocolate for ganache"
      ],
      instructions: [
        "Mix dry ingredients",
        "Combine wet ingredients",
        "Bake in preheated oven",
        "Prepare chocolate ganache",
        "Decorate cake when cooled"
      ],
      prepTime: "30 minutes",
      cookTime: "30 minutes",
      servings: 8
    },
    "5": {
      id: 5,
      title: "Quick Vegetable Stir-Fry",
      description: "Colorful vegetables in a savory sauce",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop",
      rating: 4.4,
      cuisine: "Asian",
      ingredients: [
        "Mixed vegetables",
        "Soy sauce",
        "Garlic",
        "Ginger",
        "Sesame oil",
        "Cornstarch",
        "Rice (for serving)"
      ],
      instructions: [
        "Prepare vegetables",
        "Make stir-fry sauce",
        "Heat wok or large pan",
        "Stir-fry vegetables",
        "Add sauce and thicken"
      ],
      prepTime: "10 minutes",
      cookTime: "10 minutes",
      servings: 4
    },
    "6": {
      id: 6,
      title: "Tiramisu",
      description: "Classic Italian coffee-flavored dessert",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      cuisine: "Italian",
      ingredients: [
        "Ladyfinger cookies",
        "Mascarpone cheese",
        "Strong coffee",
        "Eggs",
        "Sugar",
        "Cocoa powder",
        "Marsala wine (optional)"
      ],
      instructions: [
        "Prepare coffee and let cool",
        "Make mascarpone mixture",
        "Dip ladyfingers in coffee",
        "Layer ingredients",
        "Refrigerate overnight"
      ],
      prepTime: "30 minutes",
      cookTime: "0 minutes",
      servings: 8
    },
    // Keep existing Pakistani recipes (7-12)
    "7": {
      id: 7,
      title: "Chicken Biryani",
      description: "Aromatic rice dish layered with spiced chicken, caramelized onions, and fragrant herbs",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop",
      rating: 4.9,
      cuisine: "Pakistani",
      ingredients: [
        "1 kg basmati rice",
        "1 kg chicken",
        "2 large onions",
        "4 tomatoes",
        "Yogurt",
        "Biryani spice mix",
        "Saffron",
        "Ghee",
        "Fresh herbs (mint, coriander)"
      ],
      instructions: [
        "Marinate chicken with yogurt and spices",
        "Prepare rice until 70% done",
        "Layer rice, chicken, and fried onions",
        "Steam cook for perfect biryani",
        "Garnish with fresh herbs and saffron milk"
      ],
      prepTime: "40 minutes",
      cookTime: "60 minutes",
      servings: 6
    },
    "8": {
      id: 8,
      title: "Beef Nihari",
      description: "Slow-cooked beef stew in rich spicy gravy, a traditional Pakistani breakfast",
      image: "https://images.unsplash.com/photo-1542367592-8849eb950fd8?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      cuisine: "Pakistani",
      ingredients: [
        "1 kg beef with bones",
        "Nihari masala",
        "Wheat flour",
        "Ginger",
        "Garlic",
        "Green chilies",
        "Cooking oil"
      ],
      instructions: [
        "Cook meat with spices until tender",
        "Make a roux with wheat flour",
        "Simmer until meat falls off the bone",
        "Garnish with ginger, chilies, and lemon"
      ],
      prepTime: "30 minutes",
      cookTime: "4 hours",
      servings: 6
    },
    "9": {
      id: 9,
      title: "Chicken Karahi",
      description: "Tender chicken cooked with tomatoes and green chilies in a wok",
      image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      cuisine: "Pakistani",
      ingredients: [
        "1 kg chicken",
        "6 tomatoes",
        "Green chilies",
        "Ginger",
        "Garlic",
        "Karahi masala",
        "Fresh coriander"
      ],
      instructions: [
        "Cook chicken in karahi or wok",
        "Add tomatoes and spices",
        "Simmer until gravy thickens",
        "Finish with ginger and chilies"
      ],
      prepTime: "20 minutes",
      cookTime: "45 minutes",
      servings: 4
    },
    "10": {
      id: 10,
      title: "Seekh Kebab",
      description: "Grilled minced meat skewers with aromatic spices",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1000&auto=format&fit=crop",
      rating: 4.6,
      cuisine: "Pakistani",
      ingredients: [
        "Ground meat (beef or lamb)",
        "Onions",
        "Green chilies",
        "Ginger-garlic paste",
        "Kebab spices",
        "Fresh coriander",
        "Mint leaves"
      ],
      instructions: [
        "Mix meat with spices and herbs",
        "Form onto skewers",
        "Grill until cooked through",
        "Serve with mint chutney"
      ],
      prepTime: "20 minutes",
      cookTime: "20 minutes",
      servings: 4
    },
    "11": {
      id: 11,
      title: "Zarda",
      description: "Sweet rice with milk, sugar, nuts, and cardamom",
      image: "https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?q=80&w=1000&auto=format&fit=crop",
      rating: 4.5,
      cuisine: "Pakistani",
      ingredients: [
        "Basmati rice",
        "Sugar",
        "Milk",
        "Cardamom",
        "Mixed nuts",
        "Food coloring",
        "Dried fruits"
      ],
      instructions: [
        "Cook rice with milk and sugar",
        "Add cardamom and food coloring",
        "Mix in nuts and dried fruits",
        "Steam until fragrant"
      ],
      prepTime: "20 minutes",
      cookTime: "30 minutes",
      servings: 6
    },
    "12": {
      id: 12,
      title: "Aloo Keema",
      description: "Minced meat and potato curry with traditional spices",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
      rating: 4.4,
      cuisine: "Pakistani",
      ingredients: [
        "Ground meat",
        "Potatoes",
        "Onions",
        "Tomatoes",
        "Ginger-garlic paste",
        "Spices",
        "Fresh coriander"
      ],
      instructions: [
        "Cook meat with spices",
        "Add potatoes and cook",
        "Simmer until tender",
        "Garnish with coriander"
      ],
      prepTime: "15 minutes",
      cookTime: "30 minutes",
      servings: 4
    },
    // Keep existing Japanese and Mediterranean recipes (13-14)
    "13": {
      id: 13,
      title: "Sushi Rolls",
      description: "Fresh sushi rolls with salmon, avocado, and cucumber",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      cuisine: "Japanese",
      ingredients: [
        "Sushi rice",
        "Nori sheets",
        "Fresh salmon",
        "Avocado",
        "Cucumber",
        "Rice vinegar",
        "Wasabi",
        "Soy sauce"
      ],
      instructions: [
        "Prepare sushi rice with vinegar",
        "Layer nori with rice",
        "Add fillings",
        "Roll tightly",
        "Cut into pieces"
      ],
      prepTime: "30 minutes",
      cookTime: "15 minutes",
      servings: 4
    },
    "14": {
      id: 14,
      title: "Greek Moussaka",
      description: "Layered eggplant casserole with ground meat and béchamel sauce",
      image: "https://images.unsplash.com/photo-1621510456681-2330135e5871?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      cuisine: "Mediterranean",
      ingredients: [
        "Eggplants",
        "Ground lamb",
        "Onions",
        "Tomatoes",
        "Béchamel sauce",
        "Parmesan cheese",
        "Greek spices"
      ],
      instructions: [
        "Slice and grill eggplants",
        "Prepare meat sauce",
        "Make béchamel sauce",
        "Layer ingredients",
        "Bake until golden"
      ],
      prepTime: "45 minutes",
      cookTime: "60 minutes",
      servings: 8
    }
  };
  
  return recipes[id as keyof typeof recipes];
};

export default function RecipePage() {
  const params = useParams();
  const recipe = getRecipeDetails(params.id as string);
  const [activeTab, setActiveTab] = useState('ingredients');

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <span className="text-6xl">👨‍🍳</span>
          <h1 className="text-2xl font-bold text-gray-800">Recipe not found</h1>
          <Link 
            href="/" 
            className="inline-block text-green-600 hover:text-green-700 underline decoration-dotted"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link 
        href="/"
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 group"
      >
        <span className="mr-2 transform transition-transform group-hover:-translate-x-1">←</span>
        Back to recipes
      </Link>
      
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative h-[40vh] sm:h-[50vh] rounded-2xl overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">{recipe.title}</h1>
              <p className="text-lg text-gray-200">{recipe.description}</p>
            </div>
          </div>
        </div>

        {/* Recipe Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <span className="block text-2xl mb-1">⏱️</span>
            <span className="text-sm text-gray-600">Prep Time</span>
            <p className="font-semibold text-gray-800">{recipe.prepTime}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <span className="block text-2xl mb-1">🍳</span>
            <span className="text-sm text-gray-600">Cook Time</span>
            <p className="font-semibold text-gray-800">{recipe.cookTime}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <span className="block text-2xl mb-1">👥</span>
            <span className="text-sm text-gray-600">Servings</span>
            <p className="font-semibold text-gray-800">{recipe.servings}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <span className="block text-2xl mb-1">🌍</span>
            <span className="text-sm text-gray-600">Cuisine</span>
            <p className="font-semibold text-gray-800">{recipe.cuisine}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors relative -mb-px
                ${activeTab === 'ingredients' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors relative -mb-px
                ${activeTab === 'instructions' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Instructions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'ingredients' ? (
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-600">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Tips</h2>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-600 text-lg">💡</span>
                    <span className="text-gray-600">Make sure all ingredients are at room temperature</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-600 text-lg">💡</span>
                    <span className="text-gray-600">Prep all ingredients before starting to cook</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Step by Step Instructions</h2>
              <ol className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-gray-600 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Share and Save Buttons */}
        <div className="flex justify-center space-x-4 pt-8">
          <button className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
            <span>❤️</span>
            <span>Save Recipe</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            <span>🔗</span>
            <span>Share Recipe</span>
          </button>
        </div>
      </div>
    </div>
  );
} 