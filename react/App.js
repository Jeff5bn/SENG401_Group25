import './App.css';
import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';


function App() {

  const [message, setMessage] = useState('');
  const [rotation, setRotation] = useState(0);

  const handleSwipe = useSwipeable({ 
    onSwipedUp: () => handleSwipeAction(0),
    onSwipedDown: () => handleSwipeAction(1),
    onSwipedLeft: () => handleSwipeAction(2),
    onSwipedRight: () => handleSwipeAction(3),
  });

  const handleSwipeAction = (actionIndex) => {
    let newRotation = rotation;
    switch (actionIndex) {
      case 0:
        setMessage('Swiped Up');
        newRotation = 0;
        break;
      case 1:
        setMessage('Swiped Down');
        newRotation = 180;
        break;
      case 2:
        setMessage('Swiped Left');
        newRotation = 270;
        break;
      case 3:
        setMessage('Swiped Right');
        newRotation = 90;
        break;
      default:
        setMessage('');
        break;
    }
    setRotation(newRotation);
  };

  return (
    <div className="App">
      <h1>FlickPick</h1>
      <div style={{ textAlign: 'center' }}>
        <img {...handleSwipe} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/John_Cena_July_2018.jpg/220px-John_Cena_July_2018.jpg" alt="My Image" style={{ 
            maxWidth: '100%', 
            transform: `rotate(${rotation}deg)`
          }}  />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
