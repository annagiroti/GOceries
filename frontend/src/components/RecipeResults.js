import React from 'react';
import './RecipeResults.css';

function RecipeResults({ recipes, onViewRecipe }) {
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
              <p className="cooking-time">Ready in: {recipe.readyInMinutes || 'N/A'} min</p>
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
        <p>More Recipes</p>
        <span>↓</span>
      </div>
    </div>
  );
}

export default RecipeResults;