import RecipeCard from './RecipeCard';

// Temporary type for recipe data
type Recipe = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  cuisine: string;
  dietary?: string[];
  prepTime?: number; // in minutes
  type?: string[];
};

type Props = {
  selectedCuisine?: string;
  selectedFilter?: string;
  searchTerm?: string;
};

const RecipeGrid = ({ selectedCuisine = 'all', selectedFilter = 'all', searchTerm = '' }: Props) => {
  const allRecipes: Recipe[] = [
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
      image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?q=80&w=1000&auto=format&fit=crop",
      rating: 4.5,
      cuisine: "Italian",
      prepTime: 30,
      type: ['main', 'quick']
    },
    {
      id: 2,
      title: "Vegetable Curry",
      description: "Creamy and spicy Indian curry with mixed vegetables",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      cuisine: "Indian",
      dietary: ['vegetarian', 'vegan'],
      prepTime: 45
    },
    {
      id: 3,
      title: "Caesar Salad",
      description: "Fresh romaine lettuce with classic Caesar dressing and croutons",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1000&auto=format&fit=crop",
      rating: 4.2,
      cuisine: "American",
      dietary: ['vegetarian'],
      prepTime: 15,
      type: ['quick']
    },
    {
      id: 4,
      title: "Chocolate Cake",
      description: "Rich and moist chocolate cake with ganache",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
      rating: 4.9,
      cuisine: "International",
      type: ['dessert'],
      prepTime: 60
    },
    {
      id: 5,
      title: "Quick Vegetable Stir-Fry",
      description: "Colorful vegetables in a savory sauce",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000&auto=format&fit=crop",
      rating: 4.4,
      cuisine: "Asian",
      dietary: ['vegetarian', 'vegan'],
      type: ['quick'],
      prepTime: 20
    },
    {
      id: 6,
      title: "Tiramisu",
      description: "Classic Italian coffee-flavored dessert",
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      cuisine: "Italian",
      type: ['dessert'],
      prepTime: 40
    },
    {
      id: 7,
      title: "Chicken Biryani",
      description: "Aromatic rice dish layered with spiced chicken, caramelized onions, and fragrant herbs",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop",
      rating: 4.9,
      cuisine: "Pakistani",
      prepTime: 60,
      type: ['main']
    },
    {
      id: 8,
      title: "Beef Nihari",
      description: "Slow-cooked beef stew in rich spicy gravy, a traditional Pakistani breakfast",
      image: "https://images.unsplash.com/photo-1542367592-8849eb950fd8?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      cuisine: "Pakistani",
      prepTime: 180,
      type: ['main']
    },
    {
      id: 9,
      title: "Chicken Karahi",
      description: "Tender chicken cooked with tomatoes and green chilies in a wok",
      image: "https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      cuisine: "Pakistani",
      prepTime: 45,
      type: ['main']
    },
    {
      id: 10,
      title: "Seekh Kebab",
      description: "Grilled minced meat skewers with aromatic spices",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1000&auto=format&fit=crop",
      rating: 4.6,
      cuisine: "Pakistani",
      prepTime: 40,
      type: ['appetizer', 'quick']
    },
    {
      id: 11,
      title: "Zarda",
      description: "Sweet rice with milk, sugar, nuts, and cardamom",
      image: "https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?q=80&w=1000&auto=format&fit=crop",
      rating: 4.5,
      cuisine: "Pakistani",
      type: ['dessert'],
      prepTime: 50
    },
    {
      id: 12,
      title: "Aloo Keema",
      description: "Minced meat and potato curry with traditional spices",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
      rating: 4.4,
      cuisine: "Pakistani",
      prepTime: 35,
      type: ['main', 'quick']
    },
    {
      id: 13,
      title: "Sushi Rolls",
      description: "Fresh sushi rolls with salmon, avocado, and cucumber",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      cuisine: "Japanese",
      prepTime: 45,
      type: ['main']
    },
    {
      id: 14,
      title: "Greek Moussaka",
      description: "Layered eggplant casserole with ground meat and béchamel sauce",
      image: "https://images.unsplash.com/photo-1621510456681-2330135e5871?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      cuisine: "Mediterranean",
      prepTime: 60
    }
  ];

  // Filter recipes based on cuisine, dietary/type filters, and search term
  const filteredRecipes = allRecipes.filter(recipe => {
    const matchesCuisine = selectedCuisine === 'all' || 
      recipe.cuisine.toLowerCase() === selectedCuisine.toLowerCase();

    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'vegetarian' && recipe.dietary?.includes('vegetarian')) ||
      (selectedFilter === 'quick' && recipe.prepTime && recipe.prepTime <= 30) ||
      (selectedFilter === 'dessert' && recipe.type?.includes('dessert'));

    const matchesSearch = searchTerm === '' || 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.type?.some(type => type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      recipe.dietary?.some(diet => diet.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCuisine && matchesFilter && matchesSearch;
  });

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No recipes found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGrid;