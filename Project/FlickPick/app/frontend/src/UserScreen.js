import React, { useState } from 'react';
import './UserScreen.css';

function LoginScreen({ setShowLogin, setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusText, setStatusText] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    //Login Logic Here
    var loginSuccess = true;
    // Resetting the form after logging in
    setUsername('');
    setPassword('');
    //Login closes after logged in
    if (loginSuccess) {
        setLoggedIn(true);
        setShowLogin(false);
        setStatusText('');
    } else {
        setStatusText("Login Failed");
    }
  };

  return (
    <div className="container">
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
        <button className="login" type="submit">Login</button>
      </form>
      <label className="statusText">{statusText}</label>
    </div>
  );
}

function SettingsScreen({ setShowSettings, setLoggedIn }) {
  const handleLogout = () => {
    setLoggedIn(false);
    setShowSettings(false);
  };

  const handleReset = () => {
    //Reset call here
  }

  return (
    <div className="container">
      <h2>Settings</h2>
      <form>
        <button className="settings" type="button" onClick={handleReset}>Reset Data</button>
        <button className="settings" type="button" onClick={handleLogout}>Logout</button>
        <button className="settings" type="button" onClick={() => setShowSettings(false)}>Close</button>
      </form>
    </div>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      {loggedIn ? (
        <button className={`button-toggle ${showSettings ? 'active' : ''}`} onClick={() => setShowSettings(!showSettings)}>Settings</button>
      ) : (
        <button className={`button-toggle ${showLogin ? 'active' : ''}`} onClick={() => setShowLogin(!showLogin)}>Login</button>
      )}
      {showSettings && <SettingsScreen setShowSettings={setShowSettings} setLoggedIn={setLoggedIn} />}
      {showLogin && <LoginScreen  setShowLogin={setShowLogin} setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
