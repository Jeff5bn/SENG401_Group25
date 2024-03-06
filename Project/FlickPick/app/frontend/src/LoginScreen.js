import React, { useState } from 'react';
import './LoginScreen.css';


function LoginScreen({ setShowLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    //Login Logic Here

    // Resetting the form after logging in
    setUsername('');
    setPassword('');
    //Login closes after logged in
    setShowLogin(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <button
        className={`login-toggle ${showLogin ? 'active' : ''}`}
        onClick={() => setShowLogin(!showLogin)}
      >
      Login
      </button>
      {showLogin && <LoginScreen  setShowLogin={setShowLogin}/>}
    </div>
  );
}

export default App;