import React from 'react';

const Logout = ({ handleLogout }) => {
  const handleLogoutClick = () => {
    handleLogout();
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Logout;
