// src/components/LoginPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = () => {
        // Implement your login logic here
        // You can make API calls to your server to authenticate the user
        // If login is successful, redirect the user to a different page
        history.push('/lobby');
    };

    return (
        <div>
        <h2>Login</h2>
        <form>
            <div>
            <label>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div>
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="button" onClick={handleLogin}>
            Login
            </button>
        </form>
        </div>
    );
};

export default LoginPage;
