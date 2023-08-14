import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login'; // Adjust the path based on your file structure
import Signup from './pages/Signup'; // Adjust the path based on your file structure
import Logout from './pages/Logout'; // Adjust the path based on your file structure
import Landing from './pages/Landing'; // Adjust the path based on your file structure
import Lobby from './pages/Lobby'; // Adjust the path based on your file structure
import CreateGame from './pages/CreateGame'; // Adjust the path based on your file structure
import Game from './pages/Game'; // Adjust the path based on your file structure

const App = () => {
    return (
        <Router>
            
                <Route exact path="/" component={Landing} />
                <Route path="/Signup" component={Signup} />
                <Route path="/Login" exact component={Login} />
                <Route path="/Logout" component={Logout} />
                <Route path="/Lobby" component={Lobby} />
                <Route path="/Create-game" component={CreateGame} />
                <Route path="/Game" component={Game} />
                {/* Add your other routes here */}
            
        </Router>
    );
};

export default App;
