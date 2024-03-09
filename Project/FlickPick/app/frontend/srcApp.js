import './App.css';
import Movies from './MovieCards.js';
import UserScreen from './UserScreen.js';

function App() {
  return (
    <div className="App">
      <UserScreen></UserScreen>
      <Movies></Movies>
    </div>
  );
}

export default App;
