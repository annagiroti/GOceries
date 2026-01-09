const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com';

/**
 * Search for recipes based on ingredients
 * @param {string} ingredients - Comma-separated list of ingredients (e.g., "chicken,rice,tomato")
 * @param {number} number - Number of recipes to return (default: 12)
 * @returns {Promise<Array>} Array of recipe objects
 */
export const searchRecipesByIngredients = async (ingredients, number = 12) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=${number}&ranking=2&ignorePantry=true&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

/**
 * Get detailed information about a specific recipe
 * @param {number} id - Recipe ID
 * @returns {Promise<Object>} Recipe details object
 */
export const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};