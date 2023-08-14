import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Perform logout-related actions here, such as clearing cookies or local storage
        // ...

        // Redirect to the home page after logging out
        navigate('/'); // Use the navigate function to redirect
    }, [navigate]);

    return (
        <div>
            <h2>Logging Out...</h2>
            {/* You can show a loading spinner or a message here */}
        </div>
    );
};

export default Logout;
