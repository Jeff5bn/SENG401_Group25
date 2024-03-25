// App.js
import React, { useState } from 'react';
import './App.css';
import Movies from './MovieCards.js';
import UserScreen from './UserScreen.js';
import Gallary from './Gallary.js';
import Instructions from './HelpPanel.js';
import LoginScreen from './LoginScreen.js'

function App() {
  const [currentComponent, setCurrentComponent] = useState('movies');
  const [userId, setUserId] = useState("");

  const changeUserId = (id) => {
    console.log(id)
    setUserId(id)
  }
  const handleRecommendationsClick = () => {
    setCurrentComponent('recommendations');
  };
  const handleSelectionClick = () => {
    setCurrentComponent('movies');
  }
  return (
    <div className="App">
      {currentComponent === 'recommendations' && <Gallary handleSelectionClick={handleSelectionClick} userId={userId}/>}
      {currentComponent === 'movies' && <UserScreen changeUserId={changeUserId} userId={userId}/>}
      {currentComponent === 'movies' && <Instructions></Instructions>}
      {currentComponent === 'movies' && <Movies handleRecommendationsClick={handleRecommendationsClick} userId={userId}/>}
    </div>
  );
}

export default App;
