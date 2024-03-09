// App.js
import React, { useState } from 'react';
import './App.css';
import Movies from './MovieCards.js';
import UserScreen from './UserScreen.js';
import Gallary from './Gallary.js';

function App() {
  const [currentComponent, setCurrentComponent] = useState('movies');

  const handleRecommendationsClick = () => {
    setCurrentComponent('recommendations');
  };
  const handleSelectionClick = () => {
    setCurrentComponent('movies');
  }
  return (
    <div className="App">
      {currentComponent === 'recommendations' && <Gallary handleSelectionClick={handleSelectionClick}/>}
      {currentComponent === 'movies' && <UserScreen></UserScreen>}
      {currentComponent === 'movies' && <Movies handleRecommendationsClick={handleRecommendationsClick} />}
    </div>
  );
}

export default App;
