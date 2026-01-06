import React, { useState, useEffect } from 'react';
import { getRecipeDetails } from '../services/spoonacularApi';
import './RecipeDetail.css';

function RecipeDetail({ recipeId, onBack }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeDetails(recipeId);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
  }, [recipeId]);

  if (loading) return <div className="loading">Loading recipe...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!recipe) return null;

  return (
    <div className="recipe-detail-container">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <p>Cooking Time: {recipe.readyInMinutes} minutes</p>
      </div>

      <img 
        src={recipe.image} 
        alt={recipe.title}
        className="recipe-detail-image"
      />

      <div className="ingredients-section">
        <h2>Ingredients:</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.original}
            </li>
          ))}
        </ul>
      </div>

      <div className="instructions-section">
        <h2>Instructions:</h2>
        {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 ? (
          <div>
            {recipe.analyzedInstructions[0].steps.map((step, index) => (
              <div key={index} className="instruction-step">
                <strong>Step {step.number}:</strong> {step.step}
              </div>
            ))}
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
        )}
      </div>

      <button className="back-button" onClick={onBack}>
        Back to Results
      </button>
    </div>
  );
}

export default RecipeDetail;