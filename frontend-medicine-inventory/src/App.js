import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (loggedInUsername) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('medicines'); // Clear stored data on logout
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route 
          path="/dashboard" 
          element={
            isLoggedIn 
              ? <Dashboard onLogout={handleLogout} username={username} /> 
              : <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
