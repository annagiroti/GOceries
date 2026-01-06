import React, { useState } from 'react';
import RecipeSearch from './components/RecipeSearch';
import RecipeResults from './components/RecipeResults';
import RecipeDetail from './components/RecipeDetail';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('search'); // 'search', 'results', 'detail'
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSearchResults = (results) => {
    setRecipes(results);
    setCurrentView('results');
  };

  const handleViewRecipe = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setCurrentView('detail');
  };

  const handleBackToResults = () => {
    setCurrentView('results');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setRecipes([]);
  };

  return (
    <div className="App">
      {currentView === 'search' && (
        <RecipeSearch onSearchResults={handleSearchResults} />
      )}
      
      {currentView === 'results' && (
        <RecipeResults 
          recipes={recipes}
          onViewRecipe={handleViewRecipe}
        />
      )}
      
      {currentView === 'detail' && (
        <RecipeDetail 
          recipeId={selectedRecipeId}
          onBack={handleBackToResults}
        />
      )}
    </div>
  );
}

export default App;
