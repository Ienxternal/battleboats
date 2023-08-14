import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage({ handleSignup }) {
    const navigate = useNavigate(); // Use the useNavigate hook
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await handleSignup(username, email, password);
            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            setErrorMessage('An error occurred during signup');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupPage;
