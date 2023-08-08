import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from '../src/components/signup';
import Login from '../src/components/login';
import Logout from '../src/components/logout';
import Lobby from '../src/components/lobby';

import { io } from 'socket.io-client';
import SplashPage from './pages/api/splashPage';

const socket = io();

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  // Function to handle user login
  const handleLogin = async (user) => {
    try {
      // Save the user information in state
      setUser(user);
      setError('');

      // Save user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));

    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    try {
      // Clear the user information from state and localStorage
      setUser(null);
      setError('');
      localStorage.removeItem('user');
      socket.emit('/logout');
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  // Check for user data in localStorage on app mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Event listeners for socket.io events

    // Listen for successful login event
    socket.on('/loginSuccess', (user) => {
      handleLogin(user);
    });

    // Listen for logout event
    socket.on('/logout', () => {
      handleLogout();
    });

    // Clean up socket listeners on unmount
    return () => {
      socket.off('/loginSuccess');
      socket.off('/logout');
    };
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {user && (
              <li>
                <Link to="/lobby">Lobby</Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/lobby" element={<Lobby socket={socket} />} />
          <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
