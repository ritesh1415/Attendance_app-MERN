import React from 'react';
import Attendance from './Attendance';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
        <h1>Attendance App</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <Attendance /> {/* Render the Attendance component within the Header */}
    </>
  );
};

export default Header;
