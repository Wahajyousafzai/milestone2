'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitRecipe() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cuisine: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    image: '',
    ingredients: [''],
    instructions: ['']
  });

  const handleAddField = (field: 'ingredients' | 'instructions') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleRemoveField = (field: 'ingredients' | 'instructions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleFieldChange = (
    field: 'ingredients' | 'instructions',
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send the data to your backend
    // For now, we'll simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirect to the recipes page after submission
    router.push('/recipes');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Submit a Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Recipe Title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />

          <textarea
            placeholder="Recipe Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 h-32"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Cuisine Type"
              value={formData.cuisine}
              onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
              className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              placeholder="Servings"
              value={formData.servings}
              onChange={(e) => setFormData(prev => ({ ...prev, servings: e.target.value }))}
              className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prep Time (e.g., 30 minutes)"
              value={formData.prepTime}
              onChange={(e) => setFormData(prev => ({ ...prev, prepTime: e.target.value }))}
              className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="Cook Time (e.g., 1 hour)"
              value={formData.cookTime}
              onChange={(e) => setFormData(prev => ({ ...prev, cookTime: e.target.value }))}
              className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
            <button
              type="button"
              onClick={() => handleAddField('ingredients')}
              className="text-green-600 hover:text-green-700"
            >
              + Add Ingredient
            </button>
          </div>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleFieldChange('ingredients', index, e.target.value)}
                placeholder="Enter ingredient"
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                required
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField('ingredients', index)}
                  className="text-red-500 hover:text-red-600 px-3"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Instructions</h2>
            <button
              type="button"
              onClick={() => handleAddField('instructions')}
              className="text-green-600 hover:text-green-700"
            >
              + Add Step
            </button>
          </div>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                value={instruction}
                onChange={(e) => handleFieldChange('instructions', index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 h-24"
                required
              />
              {formData.instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveField('instructions', index)}
                  className="text-red-500 hover:text-red-600 px-3"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg text-white font-medium transition-colors
            ${isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
        </button>
      </form>
    </div>
  );
} 