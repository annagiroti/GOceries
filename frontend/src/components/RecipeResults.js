import React from 'react';
import './RecipeResults.css';

function RecipeResults({ recipes, onViewRecipe, onNewSearch }) {
  return (
    <div className="recipe-results-container">
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="recipe-image"
            />
            <div className="recipe-info">
              <h3 className="recipe-name">{recipe.title}</h3>
              <p className="ingredient-match">
                Match Score: {recipe.usedIngredientCount}/{recipe.usedIngredientCount + recipe.missedIngredientCount}
              </p>
              <button 
                className="view-recipe-button"
                onClick={() => onViewRecipe(recipe.id)}
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="more-recipes-indicator">
        <p>More Recipes Soon!</p>
        <span>🔜</span>
      </div>

      <button className="back-button" onClick={onNewSearch}>
        ← Back to Search
      </button>
    </div>
  );
}

export default RecipeResults