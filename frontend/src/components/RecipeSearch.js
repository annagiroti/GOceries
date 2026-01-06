import React, { useState } from 'react';
import { searchRecipesByIngredients } from '../services/spoonacularApi';
import './RecipeSearch.css';

function RecipeSearch({ onSearchResults }) {
  const [ingredients, setIngredients] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!ingredients.trim()) {
      setError('Please enter some ingredients');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const results = await searchRecipesByIngredients(ingredients);
      onSearchResults(results); // Pass results to parent component
    } catch (err) {
      setError('Failed to search recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-search-container">
      <div className="logo">LOGO</div>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-container">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter Your Ingredients"
            className="ingredients-input"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="search-button"
          disabled={loading}
        >
          {loading ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default RecipeSearch;