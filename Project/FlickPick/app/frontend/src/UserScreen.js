import React, { useState, useEffect } from 'react';
import './UserScreen.css';

function LoginScreen({ setShowLogin, setLoggedIn ,loggedIn, changeUserId}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [statusText, setStatusText] = useState('');
  const [signUp, setSignUp] = useState(false);

  const handleLogin = async (e) => {
    console.log(userId)
    e.preventDefault();
    if (!signUp) {
      // Login Logic Here
      var loginSuccess = true;
      // Resetting the form after logging in
      setUsername('');
      setPassword('');
      if (loginSuccess) {
        await login();
      } else {
        setStatusText("Login Failed");
      }
    } else {
      // Sign Up Logic Here
      await sign();
    }
  };

  const sign = async () => {
    const userData = {
      user_name: username,
      password: password,
      first_name: 'jeff',
      last_name: 'jeff',
      // Add any other fields as needed
    };
    try {
      const response = await fetch(`http://localhost:8000/api/create-user?`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(userData), // Convert the data object to JSON string
      });
      if (!response.ok) {
        console.log(response);
      }
      const data = await response.json();
      if (data['user_id'] === -1) {
        setStatusText("Sign Up Failed - Incorrect username or password");
      } else if (data['user_id'] !== '') {
        setUserId(data['user_id']);
        changeUserId(data['user_id']); // Call the changeUserId function with the new userId value
        setShowLogin(false); // Close the login popup
        setLoggedIn(true)
      } else {
        setStatusText("Sign Up Failed");
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }  
  
  const login = async () => {
    const userData = {
      user_name: username,
      password: password,
      // Add any other fields as needed
    };
    try {
      const response = await fetch(`http://localhost:8000/api/login?`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify(userData), // Convert the data object to JSON string
      });
      if (!response.ok) {
        console.log(response);
      }
      const data = await response.json();
      if (data['user_id'] === -1) {
        setStatusText("Login Failed - Incorrect username or password");
      } else if (data['user_id'] !== '') {
        setUserId(data['user_id']);
        changeUserId(data['user_id']); // Call the changeUserId function with the new userId value
        setLoggedIn(true)
        setShowLogin(false); // Close the login popup
      } else {
        setStatusText("Login Failed");
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  useEffect(() => {
    console.log("userId:", userId); // Log the updated value of userId
    if (userId !== '') {
      setShowLogin(false); // Close the login popup when userId is not empty
    }
    if (!loggedIn){
      setShowLogin(true)
    }
  }, [userId, setShowLogin]);
  useEffect(() => {
    if (!loggedIn){
      setUserId('');
      setShowLogin(true)
    }
  },[setLoggedIn])  



  return (
    <div className="container">
      <h2>{!signUp? 'Login' : 'Sign Up'}</h2>
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
        <button className="login" type="submit">{!signUp? 'Login' : 'Sign Up'}</button>
      </form>
      <button className="settings" type="button" onClick={() => setSignUp(!signUp)}>{!signUp ? 'Sign Up' : 'Return to Login'}</button>
      <label className="statusText">{statusText}</label>
    </div>
  );
}

function SettingsScreen({ setShowSettings, setLoggedIn ,setShowLogin,userId}) {
  const handleLogout = () => {
    setLoggedIn(false);
    setShowSettings(false);
    setShowLogin(true);
  };

  const handleReset = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reset-user-preferences?user_id=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        }
            });
      if (!response.ok) {
        console.log(response);
      }
      else{
        setShowSettings(false)
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  

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

function UserScreen({changeUserId,userId}) {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  useEffect(()=>{
    if(userId===''){
    setShowLogin(true)
  }
  else{
    setLoggedIn(true)
  }
  },[])
  return (
    <div>
      {loggedIn ? (
        <button className={`button-toggle ${showSettings ? 'active' : ''}`} onClick={() => setShowSettings(!showSettings)}>Settings</button>
      ) : (
        <button className={`button-toggle ${showLogin ? 'active' : ''}`}>Login</button>
      )}
      {showSettings && <SettingsScreen setShowSettings={setShowSettings} setLoggedIn={setLoggedIn} setShowLogin={setShowLogin} userId={userId}/>}
      {showLogin && <LoginScreen setShowLogin={setShowLogin} setLoggedIn={setLoggedIn} changeUserId={changeUserId} loggedIn={loggedIn}/>}
    </div>
  );
}

export default UserScreen;
