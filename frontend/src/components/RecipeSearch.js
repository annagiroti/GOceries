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
    
      // Sort by: 1) Fewest total ingredients, 2) Highest match %, 3) Most user ingredients used
      const sortedResults = results.sort((a, b) => {
        const totalA = a.usedIngredientCount + a.missedIngredientCount;
        const totalB = b.usedIngredientCount + b.missedIngredientCount;
        
        const percentageA = (a.usedIngredientCount / totalA) * 100;
        const percentageB = (b.usedIngredientCount / totalB) * 100;
        
        // 1. Prioritize recipes with fewest total ingredients (simpler/cheaper)
        if (totalA !== totalB) {
          return totalA - totalB;
        }
        
        // 2. If same total, prioritize higher match percentage
        if (percentageB !== percentageA) {
          return percentageB - percentageA;
        }
        
        // 3. If same percentage, prioritize using more of user's ingredients
        return b.usedIngredientCount - a.usedIngredientCount;
      });

      onSearchResults(sortedResults);
    } catch (err) {
      setError('Failed to search recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-search-container">
      <div className="logo">GOceries</div>
      
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