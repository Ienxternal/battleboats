import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        // Perform logout-related actions here, such as clearing cookies or local storage
        // ...

        // Redirect to the home page after logging out
        history.push('/');
    }, [history]);

    return (
        <div>
            <h2>Logging Out...</h2>
            {/* You can show a loading spinner or a message here */}
        </div>
    );
};

export default Logout;
