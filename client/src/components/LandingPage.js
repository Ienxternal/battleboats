import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing-container">
        <h1>Welcome to BattleBoat</h1>
        <div className="buttons-container">
            <Link to="/login">
            <button>Login</button>
            </Link>
            <Link to="/signup">
            <button>Sign Up</button>
            </Link>
        </div>
        </div>
    );
};

export default Landing;
